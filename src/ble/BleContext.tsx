import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { MOCK_MODE } from './constants';
import { jivaBle, ConnectionState } from './BleManager';

interface LiveMetrics {
  heartRate: number | null;
  hrv: number | null;
  spo2: number | null;
  rhr: number | null;
  respRate: number | null;
  skinTempDelta: number | null;
  ecgBuffer: number[];
}

interface BleContextValue {
  connectionState: ConnectionState;
  deviceName: string | null;
  metrics: LiveMetrics;
  hrHistory: number[];
  startScan: () => void;
  disconnect: () => void;
  isMockMode: boolean;
}

const defaultMetrics: LiveMetrics = {
  heartRate: null,
  hrv: null,
  spo2: null,
  rhr: null,
  respRate: null,
  skinTempDelta: null,
  ecgBuffer: [],
};

const BleContext = createContext<BleContextValue>({
  connectionState: 'IDLE',
  deviceName: null,
  metrics: defaultMetrics,
  hrHistory: [],
  startScan: () => {},
  disconnect: () => {},
  isMockMode: MOCK_MODE,
});

export const useBle = () => useContext(BleContext);

function pushBuffer<T>(arr: T[], val: T, max = 60): T[] {
  const next = [...arr, val];
  return next.length > max ? next.slice(next.length - max) : next;
}

function startMockUpdates(
  setMetrics: React.Dispatch<React.SetStateAction<LiveMetrics>>,
  setHrHistory: React.Dispatch<React.SetStateAction<number[]>>,
): () => void {
  let hr = 72;
  const interval = setInterval(() => {
    hr = Math.max(55, Math.min(100, hr + (Math.random() - 0.5) * 4));
    const hrRounded = Math.round(hr);

    setMetrics((prev) => ({
      heartRate: hrRounded,
      hrv: Math.round(38 + Math.random() * 14),
      spo2: Math.round(96 + Math.random() * 3),
      rhr: Math.round(54 + Math.random() * 8),
      respRate: Math.round(14 + Math.random() * 4),
      skinTempDelta: Math.round((Math.random() * 1.2 - 0.4) * 10) / 10,
      ecgBuffer: pushBuffer(
        prev.ecgBuffer,
        Math.sin(Date.now() / 120) * 0.8 + (Math.random() - 0.5) * 0.15,
        120,
      ),
    }));

    setHrHistory((prev) => pushBuffer(prev, hrRounded));
  }, 1000);

  return () => clearInterval(interval);
}

export const BleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>('IDLE');
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<LiveMetrics>(defaultMetrics);
  const [hrHistory, setHrHistory] = useState<number[]>([]);
  const mockCleanup = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (MOCK_MODE) {
      setConnectionState('CONNECTED');
      setDeviceName('JIVA-MOCK');
      mockCleanup.current = startMockUpdates(setMetrics, setHrHistory);
    }
    return () => {
      mockCleanup.current?.();
      if (!MOCK_MODE) jivaBle.destroy();
    };
  }, []);

  const startScan = useCallback(async () => {
    if (MOCK_MODE) return;
    const ok = await jivaBle.requestPermissions();
    if (!ok) {
      setConnectionState('ERROR');
      return;
    }

    jivaBle.scan({
      onHeartRate: (v) => {
        setMetrics((p) => ({ ...p, heartRate: v }));
        setHrHistory((p) => pushBuffer(p, v));
      },
      onHrv: (v) => setMetrics((p) => ({ ...p, hrv: v })),
      onSpo2: (v) => setMetrics((p) => ({ ...p, spo2: v })),
      onRhr: (v) => setMetrics((p) => ({ ...p, rhr: v })),
      onRespRate: (v) => setMetrics((p) => ({ ...p, respRate: v })),
      onSkinTemp: (v) => setMetrics((p) => ({ ...p, skinTempDelta: v })),
      onEcgSamples: (vs) =>
        setMetrics((p) => ({
          ...p,
          ecgBuffer: [...p.ecgBuffer, ...vs].slice(-120),
        })),
      onStateChange: setConnectionState,
      onDeviceName: setDeviceName,
    });
  }, []);

  const disconnect = useCallback(() => {
    jivaBle.disconnect();
    setConnectionState('DISCONNECTED');
    setMetrics(defaultMetrics);
    setHrHistory([]);
    setDeviceName(null);
  }, []);

  return (
    <BleContext.Provider
      value={{
        connectionState,
        deviceName,
        metrics,
        hrHistory,
        startScan,
        disconnect,
        isMockMode: MOCK_MODE,
      }}
    >
      {children}
    </BleContext.Provider>
  );
};

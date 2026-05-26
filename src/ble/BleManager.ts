import { BleManager as RNBleManager, Device, Characteristic } from 'react-native-ble-plx';
import { Platform, PermissionsAndroid } from 'react-native';
import {
  DEVICE_NAME_PREFIX,
  SERVICE_UUID,
  CHAR_UUIDS,
  parseHeartRate,
  parseHrv,
  parseSpo2,
  parseRhr,
  parseRespRate,
  parseSkinTemp,
  parseEcgSample,
} from './constants';

export type ConnectionState =
  | 'IDLE'
  | 'SCANNING'
  | 'CONNECTING'
  | 'CONNECTED'
  | 'DISCONNECTED'
  | 'ERROR';

export interface MetricCallbacks {
  onHeartRate: (v: number) => void;
  onHrv: (v: number) => void;
  onSpo2: (v: number) => void;
  onRhr: (v: number) => void;
  onRespRate: (v: number) => void;
  onSkinTemp: (v: number) => void;
  onEcgSamples: (v: number[]) => void;
  onStateChange: (s: ConnectionState) => void;
  onDeviceName: (n: string) => void;
}

class JivaBleManager {
  private manager: RNBleManager;
  private device: Device | null = null;
  private subscriptions: { remove: () => void }[] = [];

  constructor() {
    this.manager = new RNBleManager();
  }

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      return Object.values(grants).every((g) => g === PermissionsAndroid.RESULTS.GRANTED);
    }
    return true;
  }

  scan(callbacks: MetricCallbacks, timeoutMs = 15000): void {
    callbacks.onStateChange('SCANNING');

    const timeout = setTimeout(() => {
      this.manager.stopDeviceScan();
      callbacks.onStateChange('IDLE');
    }, timeoutMs);

    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        clearTimeout(timeout);
        callbacks.onStateChange('ERROR');
        return;
      }
      if (device?.name?.startsWith(DEVICE_NAME_PREFIX)) {
        clearTimeout(timeout);
        this.manager.stopDeviceScan();
        this.connect(device.id, callbacks);
      }
    });
  }

  private async connect(deviceId: string, callbacks: MetricCallbacks): Promise<void> {
    try {
      callbacks.onStateChange('CONNECTING');
      this.device = await this.manager.connectToDevice(deviceId);
      await this.device.discoverAllServicesAndCharacteristics();
      callbacks.onDeviceName(this.device.name ?? 'JIVA Band');
      callbacks.onStateChange('CONNECTED');
      this.subscribeAll(callbacks);

      this.device.onDisconnected(() => {
        this.subscriptions.forEach((s) => s.remove());
        this.subscriptions = [];
        this.device = null;
        callbacks.onStateChange('DISCONNECTED');
      });
    } catch {
      callbacks.onStateChange('ERROR');
    }
  }

  private subscribeAll(callbacks: MetricCallbacks): void {
    if (!this.device) return;
    const id = this.device.id;

    const subs: { uuid: string; handler: (c: Characteristic) => void }[] = [
      {
        uuid: CHAR_UUIDS.HEART_RATE,
        handler: (c) => c.value && callbacks.onHeartRate(parseHeartRate(c.value)),
      },
      { uuid: CHAR_UUIDS.HRV, handler: (c) => c.value && callbacks.onHrv(parseHrv(c.value)) },
      { uuid: CHAR_UUIDS.SPO2, handler: (c) => c.value && callbacks.onSpo2(parseSpo2(c.value)) },
      { uuid: CHAR_UUIDS.RHR, handler: (c) => c.value && callbacks.onRhr(parseRhr(c.value)) },
      {
        uuid: CHAR_UUIDS.RESPIRATORY_RATE,
        handler: (c) => c.value && callbacks.onRespRate(parseRespRate(c.value)),
      },
      {
        uuid: CHAR_UUIDS.SKIN_TEMP,
        handler: (c) => c.value && callbacks.onSkinTemp(parseSkinTemp(c.value)),
      },
      {
        uuid: CHAR_UUIDS.ECG_WAVEFORM,
        handler: (c) => c.value && callbacks.onEcgSamples(parseEcgSample(c.value)),
      },
    ];

    subs.forEach(({ uuid, handler }) => {
      const sub = this.manager.monitorCharacteristicForDevice(
        id,
        SERVICE_UUID,
        uuid,
        (err, char) => {
          if (!err && char) handler(char);
        },
      );
      this.subscriptions.push(sub);
    });
  }

  async disconnect(): Promise<void> {
    this.subscriptions.forEach((s) => s.remove());
    this.subscriptions = [];
    if (this.device) {
      await this.manager.cancelDeviceConnection(this.device.id).catch(() => {});
      this.device = null;
    }
  }

  destroy(): void {
    this.disconnect();
    this.manager.destroy();
  }
}

export const jivaBle = new JivaBleManager();

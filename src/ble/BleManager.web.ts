import type { ConnectionState, MetricCallbacks } from './BleManager';

/** Web stub — BLE runs in MOCK_MODE only in the browser preview. */
class JivaBleManagerWeb {
  async requestPermissions(): Promise<boolean> {
    return true;
  }

  scan(_callbacks: MetricCallbacks, _timeoutMs = 15000): void {}

  async disconnect(): Promise<void> {}

  destroy(): void {}
}

export type { ConnectionState, MetricCallbacks };
export const jivaBle = new JivaBleManagerWeb();

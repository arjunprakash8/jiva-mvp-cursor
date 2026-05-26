// ─── MOCK MODE ────────────────────────────────────────────────────────────────
// Set true during UI development or when no hardware is available.
// Set false when the JIVA band SDK UUIDs have been added below.
export const MOCK_MODE = true;

// ─── JIVA Band BLE identifiers ────────────────────────────────────────────────
// TODO: Replace all placeholder UUIDs with real values from the JIVA hardware SDK.
// These are provided in the SDK documentation under "GATT Service Table".

export const DEVICE_NAME_PREFIX = 'JIVA';

export const SERVICE_UUID = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';

export const CHAR_UUIDS = {
  HEART_RATE: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  HRV: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  SPO2: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  RHR: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  RESPIRATORY_RATE: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  SKIN_TEMP: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  ECG_WAVEFORM: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
} as const;

import { Buffer } from 'buffer';

export function parseHeartRate(b64: string): number {
  const buf = Buffer.from(b64, 'base64');
  return buf.readUInt8(0);
}

export function parseHrv(b64: string): number {
  const buf = Buffer.from(b64, 'base64');
  return buf.readUInt16LE(0);
}

export function parseSpo2(b64: string): number {
  const buf = Buffer.from(b64, 'base64');
  return buf.readUInt8(0);
}

export function parseRhr(b64: string): number {
  const buf = Buffer.from(b64, 'base64');
  return buf.readUInt8(0);
}

export function parseRespRate(b64: string): number {
  const buf = Buffer.from(b64, 'base64');
  return buf.readUInt8(0);
}

export function parseSkinTemp(b64: string): number {
  const buf = Buffer.from(b64, 'base64');
  return buf.readInt16LE(0) / 100;
}

export function parseEcgSample(b64: string): number[] {
  const buf = Buffer.from(b64, 'base64');
  const samples: number[] = [];
  for (let i = 0; i + 1 < buf.length; i += 2) {
    samples.push(buf.readInt16LE(i) / 1000);
  }
  return samples;
}

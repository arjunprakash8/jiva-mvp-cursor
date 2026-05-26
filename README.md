# JIVA Health App — Phase 1 MVP

React Native + Expo mobile app connecting to the JIVA wearable band via Bluetooth.

## Quick start

```bash
npm install
npx expo start
```

Press `i` for iOS Simulator (mock mode only — simulators have no Bluetooth).
Press `a` for Android Emulator.
Scan the QR code with Expo Go on a physical device to test real BLE.

## MOCK_MODE

```
src/ble/constants.ts → MOCK_MODE = true   (default: animated fake data, no hardware needed)
src/ble/constants.ts → MOCK_MODE = false  (requires real JIVA band in range)
```

## Connecting the hardware SDK

When the SDK documentation arrives from the hardware manufacturer:

1. Install SDK library (`npm install @jiva/band-sdk` or equivalent)
2. Update UUIDs in `src/ble/constants.ts`
3. Update parsers in `src/ble/constants.ts`
4. Set `MOCK_MODE = false`

## Phase 1 scope

✅ BLE scan, pair, connect
✅ Live HR, HRV, SpO₂, RHR, resp rate, skin temp, ECG waveform
✅ All existing UI screens preserved
✅ Mock mode for development without hardware

❌ AI scoring (Phase 2)
❌ Cloud backend (Phase 2)
❌ Insurer/doctor dashboards (Phase 3)
❌ Notifications/background sync (Phase 2)

## Running on a real device (required for BLE)

**iOS:** plug in device → trust → `expo start` → scan QR
**Android:** enable USB debugging → `expo start` → press `a` or scan QR

BLE does NOT work in simulators/emulators.

## Project structure

```
jiva-mvp/
├── app/                    # expo-router navigation
├── src/
│   ├── ble/                # BLE manager, context, constants
│   ├── hooks/              # useJivaData, useMetricHistory
│   ├── screens/            # 6 dashboard screens
│   ├── auth/               # Landing, login, signup
│   ├── components/         # Shared UI components
│   └── constants/          # Theme, sports, stretches
```

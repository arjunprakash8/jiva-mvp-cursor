# CSSBle SDK — Step 2 Setup (Android)

Library placement and Gradle/Manifest wiring for CSSBle SDK v3.06.
The React Native bridge comes in Step 3.

## 1. Library files (already in this repo)

The five SDK binaries live in **`native-libs/cssble/`**:

| File | Role |
|------|------|
| `cssblelibrary-release_v3.06.aar` | Main CSSBle SDK |
| `libble-0.5.aar` | DFU / BLE helper |
| `libdfu-1.5.aar` | Device firmware update |
| `libfastdfu-0.5.aar` | Fast DFU |
| `libcomx-0.5.jar` | Communication layer |

On prebuild, the Expo config plugin copies them to **`android/app/libs/`** (same layout as CSSBleDemo's `app/libs/`).

## 2. Gradle (matches CSSBleDemo)

CSSBleDemo uses one line in `app/build.gradle`:

```gradle
implementation fileTree(dir: 'libs', include: ['*.jar', '*.aar'])
```

The config plugin `plugins/withCssBleSdk.js` injects this automatically.

## 3. AndroidManifest (matches CSSBleDemo)

- `uses-feature` for `bluetooth_le`
- `BLUETOOTH`, `BLUETOOTH_ADMIN`, `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`
- Android 12+: `BLUETOOTH_CONNECT`, `BLUETOOTH_ADVERTISE`, `BLUETOOTH_SCAN` (with `neverForLocation`)

## 4. Commands — Step 2 checkpoint

```bash
cd ~/Projects/jiva-mvp
npm install
npx expo prebuild --platform android --clean
```

Verify:

```bash
ls android/app/libs/
grep "CSSBle SDK" android/app/build.gradle
grep BLUETOOTH android/app/src/main/AndroidManifest.xml
```

Build:

```bash
npx expo run:android
```

**Expected:** App installs and launches. BLE not functional until Step 3.

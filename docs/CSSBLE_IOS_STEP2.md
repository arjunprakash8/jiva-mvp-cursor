# CSSBle SDK — iOS Step 2

Wire **CSSBLESDK.framework v2.2.1** into the Expo iOS project (framework + permissions only — no RN bridge yet).

## What's in the repo

```
native-libs/ios-cssble/CSSBLESDK.framework   ← vendor SDK (committed)
plugins/withCssBleSdk.js                     ← copies + links on prebuild
```

Mirrors **BLESDKDemo** which embeds `CSSBLESDK.framework` directly (not CocoaPods).

## Permissions (Info.plist)

Set via `app.json` + config plugin (same as demo):

- `NSBluetoothAlwaysUsageDescription`
- `NSBluetoothPeripheralUsageDescription`

## Commands — your checkpoint

```bash
cd ~/Projects/jiva-mvp
npm install
npx expo prebuild --platform ios --clean
```

Verify:

```bash
ls ios/Frameworks/CSSBLESDK.framework/CSSBLESDK
grep -r "CSSBLESDK" ios/*.xcodeproj/project.pbxproj | head -3
grep Bluetooth ios/JIVA/Info.plist
```

Build and install on your **iPhone** (USB):

```bash
npx expo run:ios --device
```

First build may take 10–20 minutes. Xcode may prompt you to:

1. Select your **Apple ID** (Xcode → Settings → Accounts)
2. Enable **Developer Mode** on iPhone (Settings → Privacy & Security)
3. **Trust** the developer certificate on the phone

## Expected result

- App installs and launches on your iPhone
- Full UI works (MOCK_MODE vitals)
- **No band connection yet** — that's iOS Step 3 (native bridge)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Missing iOS framework` | Ensure `native-libs/ios-cssble/CSSBLESDK.framework` exists |
| Code signing error | Open `ios/JIVA.xcworkspace` in Xcode → Signing & Capabilities → select your Team |
| `framework not found CSSBLESDK` | Re-run `npx expo prebuild --platform ios --clean` |
| Expo Go | Don't use Expo Go — use `expo run:ios --device` |

## Reference demo (manufacturer)

```
~/Downloads/ios_cssble_ppg_sdk_v2.2.1(2025:05:14)/BLESDKDemo/
```

Key files for Step 3:

- `BleDeviceManager.m` — scan + connect
- `Measurement/DeviceMeasureViewController.m` — live heart rate
- `CSSBLESDK.framework/Headers/VZBLETool.h` — API surface

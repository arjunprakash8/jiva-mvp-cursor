/**
 * Expo config plugin — wires CSSBle SDK into Android + iOS native projects.
 *
 * Android (v3.06):
 *   - Copies .aar/.jar from native-libs/cssble/ → android/app/libs/
 *   - Adds fileTree dependency + BLE permissions (matches CSSBleDemo)
 *
 * iOS (v2.2.1):
 *   - Copies CSSBLESDK.framework → ios/Frameworks/
 *   - Links + embeds framework in Xcode (matches BLESDKDemo)
 *   - Bluetooth usage strings via app.json infoPlist
 *
 * Does NOT add the React Native bridge (Step 3).
 */
const {
  withAndroidManifest,
  withAppBuildGradle,
  withDangerousMod,
  withXcodeProject,
  withInfoPlist,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

// ─── Android ─────────────────────────────────────────────────────────────────

const SDK_LIBS = [
  'cssblelibrary-release_v3.06.aar',
  'libble-0.5.aar',
  'libdfu-1.5.aar',
  'libfastdfu-0.5.aar',
  'libcomx-0.5.jar',
];

const DEPS_MARKER = '// CSSBle SDK v3.06';
const DEPS_SNIPPET = `
    ${DEPS_MARKER}
    implementation fileTree(dir: 'libs', include: ['*.jar', '*.aar'])
`;

const IOS_FRAMEWORK_NAME = 'CSSBLESDK.framework';
const IOS_FRAMEWORK_REL = `Frameworks/${IOS_FRAMEWORK_NAME}`;

function copyFileOrDir(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyFileOrDir(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function copyAndroidSdkLibs(projectRoot, platformRoot) {
  const srcDir = path.join(projectRoot, 'native-libs', 'cssble');
  const destDir = path.join(platformRoot, 'app', 'libs');

  if (!fs.existsSync(srcDir)) {
    throw new Error(`[withCssBleSdk] Missing ${srcDir}`);
  }

  fs.mkdirSync(destDir, { recursive: true });
  for (const file of SDK_LIBS) {
    const src = path.join(srcDir, file);
    const dest = path.join(destDir, file);
    if (!fs.existsSync(src)) {
      throw new Error(`[withCssBleSdk] Missing SDK file: ${src}`);
    }
    fs.copyFileSync(src, dest);
  }
}

function copyIosFramework(projectRoot, platformRoot) {
  const src = path.join(projectRoot, 'native-libs', 'ios-cssble', IOS_FRAMEWORK_NAME);
  const dest = path.join(platformRoot, IOS_FRAMEWORK_REL);

  if (!fs.existsSync(src)) {
    throw new Error(`[withCssBleSdk] Missing iOS framework at ${src}`);
  }

  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  copyFileOrDir(src, dest);
}

function frameworkAlreadyLinked(xcodeProject) {
  const refs = xcodeProject.pbxFileReferenceSection();
  return Object.values(refs).some(
    (ref) =>
      ref &&
      typeof ref === 'object' &&
      ref.path &&
      String(ref.path).includes('CSSBLESDK.framework'),
  );
}

function appendBuildSettingArray(buildSettings, key, value) {
  if (!buildSettings[key]) {
    buildSettings[key] = ['$(inherited)'];
  }
  if (typeof buildSettings[key] === 'string') {
    buildSettings[key] = [buildSettings[key]];
  }
  if (!buildSettings[key].includes(value)) {
    buildSettings[key].push(value);
  }
}

function withCssBleAndroidLibs(config) {
  return withDangerousMod(config, [
    'android',
    async (cfg) => {
      copyAndroidSdkLibs(cfg.modRequest.projectRoot, cfg.modRequest.platformProjectRoot);
      return cfg;
    },
  ]);
}

function withCssBleGradle(config) {
  return withAppBuildGradle(config, (cfg) => {
    let contents = cfg.modResults.contents;
    if (!contents.includes(DEPS_MARKER)) {
      contents = contents.replace(/dependencies\s*\{/, `dependencies {${DEPS_SNIPPET}`);
    }
    cfg.modResults.contents = contents;
    return cfg;
  });
}

function ensurePermission(manifest, name, attrs = {}) {
  const usesPermission = manifest.manifest['uses-permission'] ?? [];
  const exists = usesPermission.some((p) => p.$?.['android:name'] === name);
  if (!exists) {
    usesPermission.push({ $: { 'android:name': name, ...attrs } });
  }
  manifest.manifest['uses-permission'] = usesPermission;
}

function withCssBleAndroidManifest(config) {
  return withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults.manifest;
    const features = manifest['uses-feature'] ?? [];
    if (!features.some((f) => f.$?.['android:name'] === 'android.hardware.bluetooth_le')) {
      features.push({
        $: { 'android:name': 'android.hardware.bluetooth_le', 'android:required': 'true' },
      });
    }
    manifest['uses-feature'] = features;

    ensurePermission(manifest, 'android.permission.BLUETOOTH');
    ensurePermission(manifest, 'android.permission.BLUETOOTH_ADMIN');
    ensurePermission(manifest, 'android.permission.ACCESS_FINE_LOCATION');
    ensurePermission(manifest, 'android.permission.ACCESS_COARSE_LOCATION');
    ensurePermission(manifest, 'android.permission.BLUETOOTH_CONNECT');
    ensurePermission(manifest, 'android.permission.BLUETOOTH_ADVERTISE');
    ensurePermission(manifest, 'android.permission.BLUETOOTH_SCAN', {
      'android:usesPermissionFlags': 'neverForLocation',
    });
    return cfg;
  });
}

// ─── iOS ─────────────────────────────────────────────────────────────────────

function withCssBleIosFrameworkCopy(config) {
  return withDangerousMod(config, [
    'ios',
    async (cfg) => {
      copyIosFramework(cfg.modRequest.projectRoot, cfg.modRequest.platformProjectRoot);
      return cfg;
    },
  ]);
}

function withCssBleIosXcode(config) {
  return withXcodeProject(config, (cfg) => {
    const xcodeProject = cfg.modResults;

    if (!frameworkAlreadyLinked(xcodeProject)) {
      xcodeProject.addFramework(IOS_FRAMEWORK_REL, {
        customFramework: true,
        embed: true,
        sign: true,
      });
    }

    const configurations = xcodeProject.pbxXCBuildConfigurationSection();
    for (const key in configurations) {
      const entry = configurations[key];
      if (!entry || typeof entry.buildSettings !== 'object') continue;
      const buildSettings = entry.buildSettings;

      appendBuildSettingArray(buildSettings, 'FRAMEWORK_SEARCH_PATHS', '$(PROJECT_DIR)/Frameworks');
      appendBuildSettingArray(buildSettings, 'OTHER_LDFLAGS', '-framework CSSBLESDK');
      appendBuildSettingArray(
        buildSettings,
        'LD_RUNPATH_SEARCH_PATHS',
        '@executable_path/Frameworks',
      );
    }

    return cfg;
  });
}

function withCssBleIosInfoPlist(config) {
  return withInfoPlist(config, (cfg) => {
    cfg.modResults.NSBluetoothAlwaysUsageDescription =
      cfg.modResults.NSBluetoothAlwaysUsageDescription ??
      'JIVA needs Bluetooth to connect to your JIVA Band.';
    cfg.modResults.NSBluetoothPeripheralUsageDescription =
      cfg.modResults.NSBluetoothPeripheralUsageDescription ??
      'JIVA needs Bluetooth to connect to your JIVA Band.';
    return cfg;
  });
}

module.exports = function withCssBleSdk(config) {
  // Android
  config = withCssBleAndroidLibs(config);
  config = withCssBleGradle(config);
  config = withCssBleAndroidManifest(config);
  // iOS
  config = withCssBleIosFrameworkCopy(config);
  config = withCssBleIosXcode(config);
  config = withCssBleIosInfoPlist(config);
  return config;
};

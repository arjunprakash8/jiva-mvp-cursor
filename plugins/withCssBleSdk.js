/**
 * Expo config plugin — wires CSSBle SDK v3.06 into the Android project.
 *
 * On prebuild this plugin:
 *   1. Copies the five SDK binaries from native-libs/cssble/ → android/app/libs/
 *   2. Adds fileTree dependency to app/build.gradle (matches CSSBleDemo)
 *   3. Adds BLE permissions + uses-feature to AndroidManifest.xml
 *
 * Does NOT add the React Native bridge (Step 3).
 */
const {
  withAndroidManifest,
  withAppBuildGradle,
  withDangerousMod,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

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

function copySdkLibs(projectRoot, platformRoot) {
  const srcDir = path.join(projectRoot, 'native-libs', 'cssble');
  const destDir = path.join(platformRoot, 'app', 'libs');

  if (!fs.existsSync(srcDir)) {
    throw new Error(
      `[withCssBleSdk] Missing ${srcDir}. Copy the five SDK files there first.`,
    );
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

function withCssBleLibs(config) {
  return withDangerousMod(config, [
    'android',
    async (cfg) => {
      copySdkLibs(cfg.modRequest.projectRoot, cfg.modRequest.platformProjectRoot);
      return cfg;
    },
  ]);
}

function withCssBleGradle(config) {
  return withAppBuildGradle(config, (cfg) => {
    let contents = cfg.modResults.contents;

    if (!contents.includes(DEPS_MARKER)) {
      contents = contents.replace(
        /dependencies\s*\{/,
        `dependencies {${DEPS_SNIPPET}`,
      );
    }

    cfg.modResults.contents = contents;
    return cfg;
  });
}

function ensurePermission(manifest, name, attrs = {}) {
  const usesPermission = manifest.manifest['uses-permission'] ?? [];
  const exists = usesPermission.some(
    (p) => p.$?.['android:name'] === name,
  );
  if (!exists) {
    usesPermission.push({
      $: { 'android:name': name, ...attrs },
    });
  }
  manifest.manifest['uses-permission'] = usesPermission;
}

function withCssBleManifest(config) {
  return withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults.manifest;

    const features = manifest['uses-feature'] ?? [];
    const hasBle = features.some(
      (f) => f.$?.['android:name'] === 'android.hardware.bluetooth_le',
    );
    if (!hasBle) {
      features.push({
        $: {
          'android:name': 'android.hardware.bluetooth_le',
          'android:required': 'true',
        },
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

module.exports = function withCssBleSdk(config) {
  config = withCssBleLibs(config);
  config = withCssBleGradle(config);
  config = withCssBleManifest(config);
  return config;
};

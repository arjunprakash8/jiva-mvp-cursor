import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useBle } from '../ble/BleContext';
import { C, T, SPACING, RADIUS } from '../constants/theme';

export default function ConnectionBanner() {
  const { connectionState, deviceName, startScan, disconnect, isMockMode } = useBle();

  const isConnected = connectionState === 'CONNECTED';
  const isScanning =
    connectionState === 'SCANNING' || connectionState === 'CONNECTING';

  const label = isMockMode
    ? '⬡  MOCK MODE — no hardware'
    : isConnected
      ? `⬡  ${deviceName ?? 'JIVA Band'}  ·  Connected`
      : isScanning
        ? '⬡  Scanning for JIVA Band...'
        : connectionState === 'DISCONNECTED'
          ? '⬡  Band disconnected — tap to reconnect'
          : '⬡  Tap to pair JIVA Band';

  const dotColor = isConnected ? C.success : isScanning ? C.warning : C.textDim;

  return (
    <TouchableOpacity
      onPress={isConnected ? disconnect : startScan}
      disabled={isMockMode || isScanning}
      activeOpacity={0.8}
      style={[
        styles.wrap,
        isConnected && styles.wrapConnected,
      ]}
    >
      <View style={styles.left}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <Text
          style={[
            styles.label,
            isConnected && styles.labelConnected,
          ]}
        >
          {label}
        </Text>
      </View>
      {!isMockMode && isConnected ? (
        <Text style={styles.disconnect}>DISCONNECT</Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.55)',
    marginHorizontal: SPACING.md,
    marginBottom: 6,
    borderRadius: RADIUS.sm,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: C.border,
  },
  wrapConnected: {
    borderColor: `${C.success}22`,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    ...T.mono,
    fontSize: 11,
    letterSpacing: 0.5,
    flexShrink: 1,
  },
  labelConnected: {
    color: C.success,
  },
  disconnect: {
    fontFamily: 'SpaceGrotesk_300Light',
    fontSize: 9,
    color: C.textDim,
    letterSpacing: 1.5,
  },
});

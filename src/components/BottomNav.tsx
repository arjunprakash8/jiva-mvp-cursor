import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import JivaIcon, { IconName } from './JivaIcon';
import { TabId } from '../types';
import { C, T, SPACING } from '../constants/theme';

interface BottomNavProps {
  active: TabId;
  onTabChange: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: IconName }[] = [
  { id: 'pulse', label: 'Pulse', icon: 'pulse' },
  { id: 'biometrics', label: 'Metrics', icon: 'biometrics' },
  { id: 'activity', label: 'Activity', icon: 'activity' },
  { id: 'fuel', label: 'Fuel', icon: 'fuel' },
  { id: 'recovery', label: 'Recovery', icon: 'recovery' },
  { id: 'hub', label: 'Hub', icon: 'hub' },
];

export default function BottomNav({ active, onTabChange }: BottomNavProps) {
  return (
    <View style={styles.wrap}>
      {TABS.map((tab) => {
        const on = active === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, on && styles.tabActive]}
            onPress={() => onTabChange(tab.id)}
            activeOpacity={0.7}
          >
            {on ? <View style={styles.dot} /> : null}
            <JivaIcon name={tab.icon} size={19} color={on ? C.accent : C.textDim} active={on} />
            <Text style={[styles.label, on && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 22,
    paddingHorizontal: 4,
    backgroundColor: 'rgba(2,6,23,0.98)',
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  tab: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: SPACING.sm,
    paddingHorizontal: 10,
    opacity: 0.35,
  },
  tabActive: {
    opacity: 1,
  },
  dot: {
    position: 'absolute',
    bottom: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.accent,
  },
  label: {
    ...T.caption,
    fontSize: 9,
    letterSpacing: 1.2,
  },
  labelActive: {
    color: C.accent,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },
});

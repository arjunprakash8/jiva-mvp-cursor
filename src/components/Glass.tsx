import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { C, RADIUS, SPACING } from '../constants/theme';

interface GlassProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  active?: boolean;
}

export default function Glass({ children, style, active }: GlassProps) {
  return (
    <View style={[styles.glass, active && styles.glassActive, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  glass: {
    backgroundColor: 'rgba(15,23,42,0.38)',
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    overflow: 'hidden',
  },
  glassActive: {
    borderColor: C.borderActive,
    backgroundColor: C.bgElevated,
  },
});

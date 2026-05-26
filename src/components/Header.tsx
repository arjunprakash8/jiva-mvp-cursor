import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C, T, SPACING } from '../constants/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  userInitial?: string;
}

export default function Header({ title, subtitle, userInitial = '?' }: HeaderProps) {
  const initial = userInitial.trim().charAt(0).toUpperCase() || '?';

  return (
    <View style={styles.wrap}>
      <View style={styles.textCol}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: 'rgba(2,6,23,0.94)',
  },
  textCol: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  title: {
    ...T.h1,
    fontSize: 20,
  },
  subtitle: {
    ...T.body,
    marginTop: 2,
    fontSize: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.borderActive,
    backgroundColor: C.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    color: C.text,
  },
});

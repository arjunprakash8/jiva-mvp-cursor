import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, T, SPACING, RADIUS } from '../constants/theme';

interface LandingPageProps {
  onLogin: () => void;
  onSignUp: () => void;
}

export default function LandingPage({ onLogin, onSignUp }: LandingPageProps) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.logoGlow} />
          <Text style={styles.logo}>JIVA</Text>
          <Text style={styles.tagline}>Your body. Your data. Your edge.</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onSignUp}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerDot} />
        <Text style={styles.footerText}>BIOMETRIC WEARABLE PLATFORM</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  hero: {
    alignItems: 'center',
    marginBottom: SPACING.xl * 2,
  },
  logoGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: C.accentGlow,
    top: -20,
  },
  logo: {
    ...T.hero,
    fontSize: 56,
    letterSpacing: 8,
    color: C.accent,
    textShadowColor: C.accentGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
  tagline: {
    ...T.body,
    fontSize: 16,
    color: C.textMuted,
    marginTop: SPACING.lg,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  actions: {
    gap: SPACING.md,
  },
  primaryButton: {
    backgroundColor: C.accent,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md + 2,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 16,
    color: C.bg,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md + 2,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.borderActive,
    backgroundColor: 'rgba(0,242,255,0.06)',
  },
  secondaryButtonText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 16,
    color: C.accent,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  footerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.accent,
  },
  footerText: {
    ...T.caption,
    color: C.textDim,
  },
});

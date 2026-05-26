import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Glass from '../components/Glass';
import { useBle } from '../ble/BleContext';
import { C, T, SPACING, RADIUS } from '../constants/theme';
import type { User } from '../types';

type BleUiState = 'scanning' | 'connected';

interface SignupFlowProps {
  onComplete: (user: User) => void;
  onBack: () => void;
  onLoginLink: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
}

const GENDERS = ['Male', 'Female', 'Other'] as const;
const TOTAL_STEPS = 4;

function mapBleState(connectionState: string): BleUiState {
  if (connectionState === 'CONNECTED') return 'connected';
  return 'scanning';
}

function ConcentricRings({ active }: { active: boolean }) {
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!active) {
      ring1.setValue(0);
      ring2.setValue(0);
      ring3.setValue(0);
      return;
    }

    const animateRing = (value: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration: 2400,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );

    const a1 = animateRing(ring1, 0);
    const a2 = animateRing(ring2, 600);
    const a3 = animateRing(ring3, 1200);

    a1.start();
    a2.start();
    a3.start();

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [active, ring1, ring2, ring3]);

  const renderRing = (anim: Animated.Value, size: number) => {
    const scale = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 1.4],
    });
    const opacity = anim.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [0.6, 0.35, 0],
    });

    return (
      <Animated.View
        key={size}
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity,
            transform: [{ scale }],
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.ringsContainer}>
      {renderRing(ring1, 120)}
      {renderRing(ring2, 160)}
      {renderRing(ring3, 200)}
      <View style={styles.ringCore}>
        <Ionicons
          name={active ? 'bluetooth' : 'bluetooth-outline'}
          size={32}
          color={C.accent}
        />
      </View>
    </View>
  );
}

export default function SignupFlow({ onComplete, onBack, onLoginLink }: SignupFlowProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
  });
  const [error, setError] = useState<string | null>(null);

  const { connectionState, deviceName, startScan } = useBle();
  const bleState = mapBleState(connectionState);
  const scanStarted = useRef(false);

  useEffect(() => {
    if (step === 3 && !scanStarted.current) {
      scanStarted.current = true;
      startScan();
    }
  }, [step, startScan]);

  const updateField = useCallback(
    (key: keyof FormData, value: string) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setError(null);
    },
    [],
  );

  const validateStep = useCallback((): boolean => {
    switch (step) {
      case 1: {
        if (!form.name.trim()) {
          setError('Please enter your name.');
          return false;
        }
        if (!form.email.trim() || !form.email.includes('@')) {
          setError('Please enter a valid email.');
          return false;
        }
        if (form.password.length < 6) {
          setError('Password must be at least 6 characters.');
          return false;
        }
        return true;
      }
      case 2: {
        const age = parseInt(form.age, 10);
        const weight = parseFloat(form.weight);
        const height = parseFloat(form.height);
        if (!age || age < 13 || age > 120) {
          setError('Please enter a valid age (13–120).');
          return false;
        }
        if (!weight || weight < 20 || weight > 300) {
          setError('Please enter a valid weight in kg.');
          return false;
        }
        if (!height || height < 100 || height > 250) {
          setError('Please enter a valid height in cm.');
          return false;
        }
        if (!form.gender) {
          setError('Please select your gender.');
          return false;
        }
        return true;
      }
      default:
        return true;
    }
  }, [step, form]);

  const handleNext = useCallback(() => {
    if (step < 3 && !validateStep()) return;
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      setError(null);
    }
  }, [step, validateStep]);

  const handleBack = useCallback(() => {
    if (step === 1) {
      onBack();
    } else {
      setStep((s) => s - 1);
      setError(null);
    }
  }, [step, onBack]);

  const handleEnterJiva = useCallback(() => {
    const user: User = {
      id: `user_${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      age: parseInt(form.age, 10),
      weight: parseFloat(form.weight),
      height: parseFloat(form.height),
      gender: form.gender,
    };
    setStep(4);
    setTimeout(() => onComplete(user), 1800);
  }, [form, onComplete]);

  const renderProgress = () => (
    <View style={styles.progressRow}>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <View
          key={i}
          style={[styles.progressDot, i + 1 <= step && styles.progressDotActive]}
        />
      ))}
    </View>
  );

  const renderStep1 = () => (
    <Glass style={styles.form}>
      <Text style={styles.stepTitle}>Personal details</Text>
      <Text style={styles.stepSubtitle}>Let's set up your account</Text>

      <Text style={styles.label}>Full name</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={(v) => updateField('name', v)}
        placeholder="Alex Morgan"
        placeholderTextColor={C.textDim}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(v) => updateField('email', v)}
        placeholder="you@example.com"
        placeholderTextColor={C.textDim}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={form.password}
        onChangeText={(v) => updateField('password', v)}
        placeholder="Min. 6 characters"
        placeholderTextColor={C.textDim}
        secureTextEntry
        autoCapitalize="none"
      />
    </Glass>
  );

  const renderStep2 = () => (
    <Glass style={styles.form}>
      <Text style={styles.stepTitle}>Body metrics</Text>
      <Text style={styles.stepSubtitle}>Calibrate your baseline</Text>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={form.age}
            onChangeText={(v) => updateField('age', v)}
            placeholder="28"
            placeholderTextColor={C.textDim}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={form.weight}
            onChangeText={(v) => updateField('weight', v)}
            placeholder="72"
            placeholderTextColor={C.textDim}
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        value={form.height}
        onChangeText={(v) => updateField('height', v)}
        placeholder="175"
        placeholderTextColor={C.textDim}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderRow}>
        {GENDERS.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.genderChip, form.gender === g && styles.genderChipActive]}
            onPress={() => updateField('gender', g)}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.genderChipText, form.gender === g && styles.genderChipTextActive]}
            >
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Glass>
  );

  const renderStep3 = () => (
    <View style={styles.pairContainer}>
      <ConcentricRings active={bleState === 'scanning'} />

      <Text style={styles.pairTitle}>
        {bleState === 'connected' ? 'Device found' : 'Searching for JIVA'}
      </Text>
      <Text style={styles.pairSubtitle}>
        {bleState === 'connected'
          ? 'Your wearable is ready to sync'
          : 'Keep your device nearby and powered on'}
      </Text>

      {deviceName ? (
        <Glass style={styles.deviceReveal} active>
          <Ionicons name="watch-outline" size={20} color={C.accent} />
          <Text style={styles.deviceName}>{deviceName}</Text>
        </Glass>
      ) : null}

      {bleState === 'connected' ? (
        <TouchableOpacity
          style={styles.enterButton}
          onPress={handleEnterJiva}
          activeOpacity={0.85}
        >
          <Text style={styles.enterButtonText}>Enter JIVA</Text>
          <Ionicons name="arrow-forward" size={20} color={C.bg} />
        </TouchableOpacity>
      ) : (
        <View style={styles.scanningBadge}>
          <View style={styles.scanningDot} />
          <Text style={styles.scanningText}>Scanning…</Text>
        </View>
      )}
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeGlow} />
      <Text style={styles.welcomeEmoji}>✦</Text>
      <Text style={styles.welcomeTitle}>Welcome, {form.name.split(' ')[0]}</Text>
      <Text style={styles.welcomeSubtitle}>
        Your JIVA ecosystem is ready.{'\n'}Let's unlock your edge.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {step < 4 && (
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={24} color={C.textMuted} />
            </TouchableOpacity>
            {renderProgress()}
            <View style={styles.topBarSpacer} />
          </View>
        )}

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {step <= 2 && (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
              <Text style={styles.nextButtonText}>Continue</Text>
            </TouchableOpacity>
          )}

          {step === 1 && (
            <TouchableOpacity style={styles.linkRow} onPress={onLoginLink} activeOpacity={0.7}>
              <Text style={styles.linkMuted}>Already have an account? </Text>
              <Text style={styles.linkAccent}>Login</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarSpacer: {
    width: 40,
  },
  progressRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  progressDot: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.border,
  },
  progressDotActive: {
    backgroundColor: C.accent,
  },
  form: {
    padding: SPACING.lg,
    marginTop: SPACING.md,
  },
  stepTitle: {
    ...T.h2,
    marginBottom: SPACING.xs,
  },
  stepSubtitle: {
    ...T.body,
    marginBottom: SPACING.lg,
  },
  label: {
    ...T.caption,
    color: C.textMuted,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  input: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 15,
    color: C.text,
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md - 2,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  halfField: {
    flex: 1,
  },
  genderRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  genderChip: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    backgroundColor: 'rgba(15,23,42,0.4)',
  },
  genderChipActive: {
    borderColor: C.borderActive,
    backgroundColor: C.accentGlow,
  },
  genderChipText: {
    ...T.h3,
    fontSize: 13,
    color: C.textMuted,
  },
  genderChipTextActive: {
    color: C.accent,
  },
  errorBox: {
    backgroundColor: 'rgba(239,68,68,0.12)',
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.25)',
  },
  errorText: {
    ...T.body,
    color: C.danger,
    fontSize: 13,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: C.accent,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  nextButtonText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 16,
    color: C.bg,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  linkMuted: {
    ...T.body,
  },
  linkAccent: {
    ...T.body,
    color: C.accent,
    fontFamily: 'SpaceGrotesk_600SemiBold',
  },
  pairContainer: {
    alignItems: 'center',
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  ringsContainer: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  ring: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: C.accent,
  },
  ringCore: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: C.accentGlow,
    borderWidth: 1,
    borderColor: C.borderActive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pairTitle: {
    ...T.h1,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  pairSubtitle: {
    ...T.body,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  deviceReveal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.xl,
  },
  deviceName: {
    ...T.h3,
    color: C.accent,
  },
  enterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: C.accent,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  enterButtonText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 16,
    color: C.bg,
  },
  scanningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.bgCard,
  },
  scanningDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.accent,
  },
  scanningText: {
    ...T.mono,
    color: C.textMuted,
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 3,
  },
  welcomeGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: C.accentGlow,
  },
  welcomeEmoji: {
    fontSize: 48,
    color: C.accent,
    marginBottom: SPACING.lg,
  },
  welcomeTitle: {
    ...T.hero,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  welcomeSubtitle: {
    ...T.body,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useJivaData } from '../hooks/useJivaData';
import { useBle } from '../ble/BleContext';
import Glass from '../components/Glass';
import DashboardHeader from '../components/DashboardHeader';
import OrbitalTriad from '../components/OrbitalTriad';
import ECGWave from '../components/ECGWave';
import JivaIcon from '../components/JivaIcon';
import { C, T, SPACING, RADIUS } from '../constants/theme';
import { User } from '../types';

interface PulseScreenProps {
  user?: User | null;
}

export default function PulseScreen({ user }: PulseScreenProps) {
  const data = useJivaData(user);
  const { metrics } = useBle();
  const [messages, setMessages] = useState(data.aiMessages);
  const [chatInput, setChatInput] = useState('');

  const bpm = metrics.heartRate ?? data.ecgBpm;
  const ecgSamples = metrics.ecgBuffer.length > 0 ? metrics.ecgBuffer : [];

  const sendMessage = () => {
    const text = chatInput.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user' as const, text },
      {
        role: 'assistant' as const,
        text: 'Thanks for sharing. I will factor that into your recovery guidance.',
      },
    ]);
    setChatInput('');
  };

  return (
    <View style={styles.container}>
      <DashboardHeader
        title="Pulse"
        subtitle="Live vitals & daily readiness"
        userInitial={user?.name ?? 'J'}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <OrbitalTriad
          recovery={data.readiness}
          strain={data.strain}
          sleep={data.sleepScore}
        />

        <Glass style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={T.caption}>LIVE ECG</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>STREAMING</Text>
            </View>
          </View>
          <ECGWave bpm={bpm} samples={ecgSamples} />
        </Glass>

        <Glass style={styles.section}>
          <View style={styles.sectionHeader}>
            <JivaIcon name="chat" size={18} color={C.accent} active />
            <Text style={[T.h3, styles.sectionTitle]}>JIVA AI</Text>
          </View>

          <View style={styles.chatList}>
            {messages.map((msg, i) => (
              <View
                key={`${msg.role}-${i}`}
                style={[
                  styles.bubble,
                  msg.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    msg.role === 'user' && styles.bubbleTextUser,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Ask JIVA anything..."
              placeholderTextColor={C.textDim}
              value={chatInput}
              onChangeText={setChatInput}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage} activeOpacity={0.7}>
              <JivaIcon name="send" size={18} color={C.bg} active />
            </TouchableOpacity>
          </View>
        </Glass>

        <Glass style={styles.section}>
          <Text style={T.caption}>TODAY&apos;S JOURNAL</Text>
          <Text style={[T.h3, styles.journalPrompt]}>{data.journalPrompt}</Text>
          <TouchableOpacity style={styles.journalBtn} activeOpacity={0.7}>
            <Text style={styles.journalBtnText}>Write entry</Text>
            <JivaIcon name="chevron" size={16} color={C.accent} active />
          </TouchableOpacity>
        </Glass>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  section: {
    gap: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  sectionTitle: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.danger,
  },
  liveText: {
    ...T.monoSm,
    color: C.danger,
    fontSize: 9,
  },
  chatList: {
    gap: SPACING.sm,
    marginVertical: SPACING.sm,
  },
  bubble: {
    maxWidth: '88%',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.md,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: C.accent,
  },
  bubbleAssistant: {
    alignSelf: 'flex-start',
    backgroundColor: C.bgElevated,
    borderWidth: 1,
    borderColor: C.border,
  },
  bubbleText: {
    ...T.body,
    color: C.text,
    lineHeight: 20,
  },
  bubbleTextUser: {
    color: C.bg,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  input: {
    flex: 1,
    ...T.body,
    color: C.text,
    backgroundColor: C.bgElevated,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  journalPrompt: {
    marginTop: SPACING.sm,
    lineHeight: 22,
  },
  journalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  journalBtnText: {
    ...T.h3,
    color: C.accent,
    fontSize: 14,
  },
});

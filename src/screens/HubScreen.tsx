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
import Glass from '../components/Glass';
import DashboardHeader from '../components/DashboardHeader';
import JivaIcon from '../components/JivaIcon';
import { C, T, SPACING, RADIUS } from '../constants/theme';
import { SquadMessage, User } from '../types';

interface HubScreenProps {
  user?: User | null;
}

export default function HubScreen({ user }: HubScreenProps) {
  const data = useJivaData(user);
  const squad = data.squads[0];

  const [messages, setMessages] = useState<SquadMessage[]>(squad?.messages ?? []);
  const [input, setInput] = useState('');

  if (!squad) {
    return (
      <View style={styles.container}>
        <DashboardHeader title="Hub" subtitle="Squad & events" userInitial={user?.name ?? 'J'} />
        <View style={styles.empty}>
          <Text style={T.body}>No squad joined yet.</Text>
        </View>
      </View>
    );
  }

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        author: user?.name?.split(' ')[0] ?? 'You',
        text,
        time,
      },
    ]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <DashboardHeader
        title="Hub"
        subtitle="Squad chat & events"
        userInitial={user?.name ?? 'J'}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Glass active style={styles.squadCard}>
          <View style={styles.squadHeader}>
            <JivaIcon name="hub" size={22} color={C.accent} active />
            <View style={styles.squadInfo}>
              <Text style={T.h2}>{squad.name}</Text>
              <Text style={T.body}>{squad.members} members</Text>
            </View>
          </View>
          <View style={styles.inviteRow}>
            <Text style={T.caption}>INVITE CODE</Text>
            <View style={styles.inviteCode}>
              <Text style={styles.inviteText}>{squad.inviteCode}</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <JivaIcon name="plus" size={16} color={C.accent} active />
              </TouchableOpacity>
            </View>
          </View>
        </Glass>

        <View style={styles.section}>
          <Text style={T.caption}>MESSAGES</Text>
          {messages.map((msg) => {
            const isSelf = msg.author === (user?.name?.split(' ')[0] ?? 'You');
            return (
              <Glass key={msg.id} style={styles.messageCard}>
                <View style={styles.messageHeader}>
                  <Text style={[T.h3, isSelf && styles.selfAuthor]}>{msg.author}</Text>
                  <Text style={T.monoSm}>{msg.time}</Text>
                </View>
                <Text style={T.body}>{msg.text}</Text>
              </Glass>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={T.caption}>UPCOMING EVENTS</Text>
          {data.events.map((event) => (
            <Glass key={event.id} style={styles.eventCard}>
              <Text style={T.h3}>{event.title}</Text>
              <View style={styles.eventMeta}>
                <Text style={T.body}>
                  {event.date} · {event.time}
                </Text>
                <Text style={T.body}>{event.location}</Text>
              </View>
              <View style={styles.eventFooter}>
                <JivaIcon name="user" size={14} color={C.textMuted} />
                <Text style={T.monoSm}>{event.attendees} attending</Text>
              </View>
            </Glass>
          ))}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Message your squad..."
            placeholderTextColor={C.textDim}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage} activeOpacity={0.7}>
            <JivaIcon name="send" size={18} color={C.bg} active />
          </TouchableOpacity>
        </View>
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
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    gap: SPACING.sm,
  },
  squadCard: {
    gap: SPACING.md,
  },
  squadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  squadInfo: {
    flex: 1,
    gap: 2,
  },
  inviteRow: {
    gap: SPACING.xs,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  inviteCode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: C.bgElevated,
    borderWidth: 1,
    borderColor: C.borderActive,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginTop: SPACING.xs,
  },
  inviteText: {
    ...T.mono,
    color: C.accent,
    letterSpacing: 2,
  },
  messageCard: {
    marginTop: SPACING.xs,
    gap: SPACING.xs,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selfAuthor: {
    color: C.accent,
  },
  eventCard: {
    marginTop: SPACING.xs,
    gap: SPACING.xs,
  },
  eventMeta: {
    gap: 2,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
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
});

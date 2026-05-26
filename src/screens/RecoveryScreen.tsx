import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useJivaData } from '../hooks/useJivaData';
import Glass from '../components/Glass';
import DashboardHeader from '../components/DashboardHeader';
import JivaIcon from '../components/JivaIcon';
import { C, T, SPACING, RADIUS } from '../constants/theme';
import { User } from '../types';

interface RecoveryScreenProps {
  user?: User | null;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatSleepHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

export default function RecoveryScreen({ user }: RecoveryScreenProps) {
  const data = useJivaData(user);

  const [timers, setTimers] = useState<Record<string, number>>(() =>
    Object.fromEntries(data.recoveryProtocols.map((p) => [p.id, p.duration])),
  );
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        if (!activeProtocol) return prev;
        const remaining = prev[activeProtocol];
        if (remaining <= 0) return prev;
        return { ...prev, [activeProtocol]: remaining - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeProtocol]);

  const totalSleepDuration = useMemo(
    () => data.sleepPhases.reduce((sum, phase) => sum + phase.duration, 0),
    [data.sleepPhases],
  );

  const cyclePct = (data.cycleDay / data.cycleLength) * 100;

  const startProtocol = (id: string, duration: number) => {
    setActiveProtocol(id);
    setTimers((prev) => ({ ...prev, [id]: duration }));
  };

  const resetProtocol = (id: string, duration: number) => {
    setActiveProtocol(null);
    setTimers((prev) => ({ ...prev, [id]: duration }));
  };

  return (
    <View style={styles.container}>
      <DashboardHeader
        title="Recovery"
        subtitle="Sleep, protocols & cycle"
        userInitial={user?.name ?? 'J'}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Glass active style={styles.sleepScoreCard}>
          <View style={styles.sleepScoreHeader}>
            <JivaIcon name="moon" size={20} color={C.sleep} active />
            <Text style={T.caption}>SLEEP SCORE</Text>
          </View>
          <Text style={[T.hero, styles.sleepScore]}>{data.sleepScore}%</Text>
          <Text style={T.body}>Total sleep: {formatSleepHours(data.sleepTotal)}</Text>
        </Glass>

        <Glass style={styles.phasesCard}>
          <Text style={T.caption}>SLEEP PHASES</Text>
          <View style={styles.phaseBar}>
            {data.sleepPhases.map((phase) => (
              <View
                key={phase.name}
                style={[
                  styles.phaseSegment,
                  {
                    flex: phase.duration,
                    backgroundColor: phase.color,
                  },
                ]}
              />
            ))}
          </View>
          <View style={styles.phaseLegend}>
            {data.sleepPhases.map((phase) => (
              <View key={phase.name} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: phase.color }]} />
                <Text style={T.monoSm}>
                  {phase.name} {phase.duration}h
                </Text>
              </View>
            ))}
          </View>
          <Text style={[T.body, styles.phaseTotal]}>
            Total tracked: {formatSleepHours(totalSleepDuration)}
          </Text>
        </Glass>

        <View style={styles.section}>
          <Text style={T.caption}>RECOVERY PROTOCOLS</Text>
          {data.recoveryProtocols.map((protocol) => {
            const remaining = timers[protocol.id] ?? protocol.duration;
            const running = activeProtocol === protocol.id && remaining > 0;
            const done = remaining === 0;

            return (
              <Glass key={protocol.id} style={styles.protocolCard}>
                <View style={styles.protocolHeader}>
                  <Text style={T.h3}>{protocol.name}</Text>
                  <Text
                    style={[
                      styles.timer,
                      running && styles.timerActive,
                      done && styles.timerDone,
                    ]}
                  >
                    {done ? 'Complete' : formatDuration(remaining)}
                  </Text>
                </View>
                <Text style={[T.body, styles.protocolDesc]}>{protocol.description}</Text>
                <View style={styles.protocolActions}>
                  {!running && !done ? (
                    <TouchableOpacity
                      style={styles.startBtn}
                      onPress={() => startProtocol(protocol.id, protocol.duration)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.startBtnText}>Start</Text>
                    </TouchableOpacity>
                  ) : null}
                  {running ? (
                    <TouchableOpacity
                      style={styles.resetBtn}
                      onPress={() => resetProtocol(protocol.id, protocol.duration)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.resetBtnText}>Pause</Text>
                    </TouchableOpacity>
                  ) : null}
                  {done ? (
                    <TouchableOpacity
                      style={styles.resetBtn}
                      onPress={() => resetProtocol(protocol.id, protocol.duration)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.resetBtnText}>Reset</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </Glass>
            );
          })}
        </View>

        <Glass style={styles.cycleCard}>
          <View style={styles.cycleHeader}>
            <JivaIcon name="recovery" size={18} color={C.pink} active />
            <Text style={T.caption}>CYCLE TRACKER</Text>
          </View>
          <View style={styles.cycleStats}>
            <Text style={[T.metric, styles.cycleDay]}>Day {data.cycleDay}</Text>
            <Text style={T.body}>of {data.cycleLength}-day cycle</Text>
          </View>
          <View style={styles.cycleTrack}>
            <View style={[styles.cycleFill, { width: `${cyclePct}%` }]} />
          </View>
          <Text style={[T.monoSm, styles.cycleHint]}>
            {data.cycleLength - data.cycleDay} days remaining in current cycle
          </Text>
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
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  section: {
    gap: SPACING.sm,
  },
  sleepScoreCard: {
    alignItems: 'center',
    gap: SPACING.sm,
  },
  sleepScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  sleepScore: {
    color: C.sleep,
  },
  phasesCard: {
    gap: SPACING.sm,
  },
  phaseBar: {
    flexDirection: 'row',
    height: 12,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
    marginTop: SPACING.sm,
  },
  phaseSegment: {
    minWidth: 4,
  },
  phaseLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  phaseTotal: {
    marginTop: SPACING.xs,
  },
  protocolCard: {
    marginTop: SPACING.xs,
    gap: SPACING.sm,
  },
  protocolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timer: {
    ...T.mono,
    color: C.textMuted,
  },
  timerActive: {
    color: C.accent,
  },
  timerDone: {
    color: C.recovery,
  },
  protocolDesc: {
    lineHeight: 20,
  },
  protocolActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  startBtn: {
    backgroundColor: C.accent,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  startBtnText: {
    ...T.h3,
    color: C.bg,
    fontSize: 13,
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  resetBtnText: {
    ...T.h3,
    fontSize: 13,
    color: C.textMuted,
  },
  cycleCard: {
    gap: SPACING.sm,
  },
  cycleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  cycleStats: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  cycleDay: {
    color: C.pink,
  },
  cycleTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    marginTop: SPACING.sm,
  },
  cycleFill: {
    height: '100%',
    backgroundColor: C.pink,
    borderRadius: RADIUS.full,
  },
  cycleHint: {
    marginTop: SPACING.xs,
  },
});

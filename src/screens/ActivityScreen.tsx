import React, { useMemo, useState } from 'react';
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
import JivaIcon, { IconName } from '../components/JivaIcon';
import AnatomicalFigure, { MuscleGroup } from '../components/AnatomicalFigure';
import { C, T, SPACING, RADIUS } from '../constants/theme';
import { SPORTS_CATALOG } from '../constants/sportsData';
import { STRETCH_LIBRARY } from '../constants/stretchLibrary';
import { User } from '../types';

interface ActivityScreenProps {
  user?: User | null;
}

function matchSport(activityName: string) {
  const lower = activityName.toLowerCase();
  return SPORTS_CATALOG.find(
    (s) => lower.includes(s.name.toLowerCase()) || lower.includes(s.id),
  );
}

export default function ActivityScreen({ user }: ActivityScreenProps) {
  const data = useJivaData(user);
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);

  const activityLoads = useMemo(
    () =>
      data.activities.map((a) => {
        const sport = matchSport(a.name);
        return {
          muscles: sport?.muscleGroups ?? ['full'],
          strain: a.strain,
        };
      }),
    [data.activities],
  );

  const highlightedMuscles = useMemo(() => {
    const selected = SPORTS_CATALOG.find((s) => s.id === selectedSportId);
    if (selected) return selected.muscleGroups as MuscleGroup[];

    const set = new Set<string>();
    activityLoads.forEach((load) => load.muscles.forEach((m) => set.add(m)));
    return Array.from(set) as MuscleGroup[];
  }, [selectedSportId, activityLoads]);

  const stretches = useMemo(() => {
    const groups = highlightedMuscles.length ? highlightedMuscles : ['full'];
    return groups.flatMap((g) => STRETCH_LIBRARY[g] ?? []);
  }, [highlightedMuscles]);

  return (
    <View style={styles.container}>
      <DashboardHeader
        title="Activity"
        subtitle="Strain, sports & mobility"
        userInitial={user?.name ?? 'J'}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Glass active style={styles.strainCard}>
          <Text style={T.caption}>TODAY&apos;S STRAIN</Text>
          <View style={styles.strainRow}>
            <Text style={[T.hero, styles.strainValue]}>{data.strain}</Text>
            <Text style={styles.strainMax}>/ 25</Text>
          </View>
          <View style={styles.strainBarTrack}>
            <View
              style={[
                styles.strainBarFill,
                { width: `${Math.min((data.strain / 25) * 100, 100)}%` },
              ]}
            />
          </View>
        </Glass>

        <View style={styles.section}>
          <Text style={T.caption}>TODAY&apos;S ACTIVITIES</Text>
          {data.activities.map((activity) => (
            <Glass key={activity.id} style={styles.activityCard}>
              <View style={styles.activityRow}>
                <View style={styles.activityInfo}>
                  <Text style={T.h3}>{activity.name}</Text>
                  <Text style={T.body}>
                    {activity.time} · {activity.duration} min · {activity.calories} cal
                  </Text>
                </View>
                <View style={styles.strainPill}>
                  <Text style={styles.strainPillText}>{activity.strain}</Text>
                </View>
              </View>
            </Glass>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={T.caption}>SPORTS CATALOG</Text>
          <View style={styles.sportsGrid}>
            {SPORTS_CATALOG.map((sport) => {
              const selected = selectedSportId === sport.id;
              return (
                <TouchableOpacity
                  key={sport.id}
                  style={[styles.sportTile, selected && styles.sportTileActive]}
                  onPress={() => setSelectedSportId(selected ? null : sport.id)}
                  activeOpacity={0.7}
                >
                  <JivaIcon
                    name={sport.icon as IconName}
                    size={22}
                    color={selected ? C.accent : C.textMuted}
                    active={selected}
                  />
                  <Text style={[T.body, styles.sportName, selected && styles.sportNameActive]}>
                    {sport.name}
                  </Text>
                  <Text style={T.monoSm}>×{sport.strainMultiplier}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <Glass style={styles.figureSection}>
          <Text style={T.caption}>MUSCLE LOAD</Text>
          <View style={styles.figureWrap}>
            <AnatomicalFigure
              activities={activityLoads}
              highlighted={highlightedMuscles}
              width={140}
              height={250}
            />
          </View>
        </Glass>

        <View style={styles.section}>
          <Text style={T.caption}>STRETCH LIBRARY</Text>
          {stretches.length === 0 ? (
            <Glass>
              <Text style={T.body}>Select a sport or log activity to see stretches.</Text>
            </Glass>
          ) : (
            stretches.map((stretch) => (
              <Glass key={stretch.id} style={styles.stretchCard}>
                <View style={styles.stretchHeader}>
                  <Text style={T.h3}>{stretch.name}</Text>
                  <Text style={styles.stretchDuration}>{stretch.duration}s</Text>
                </View>
                <Text style={T.caption}>{stretch.target.toUpperCase()}</Text>
                <Text style={[T.body, styles.stretchInstructions]}>{stretch.instructions}</Text>
              </Glass>
            ))
          )}
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
  section: {
    gap: SPACING.sm,
  },
  strainCard: {
    gap: SPACING.sm,
  },
  strainRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.xs,
  },
  strainValue: {
    color: C.strain,
  },
  strainMax: {
    ...T.h2,
    color: C.textDim,
    fontSize: 16,
  },
  strainBarTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    marginTop: SPACING.xs,
  },
  strainBarFill: {
    height: '100%',
    backgroundColor: C.strain,
    borderRadius: RADIUS.full,
  },
  activityCard: {
    marginTop: SPACING.xs,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityInfo: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  strainPill: {
    backgroundColor: `${C.strain}22`,
    borderWidth: 1,
    borderColor: `${C.strain}55`,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  strainPillText: {
    ...T.metricSm,
    color: C.strain,
    fontSize: 16,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  sportTile: {
    width: '47%',
    backgroundColor: C.bgCard,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  sportTileActive: {
    borderColor: C.borderActive,
    backgroundColor: C.bgElevated,
  },
  sportName: {
    textAlign: 'center',
    fontSize: 13,
  },
  sportNameActive: {
    color: C.accent,
  },
  figureSection: {
    alignItems: 'center',
    gap: SPACING.sm,
  },
  figureWrap: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  stretchCard: {
    marginTop: SPACING.xs,
    gap: SPACING.xs,
  },
  stretchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stretchDuration: {
    ...T.mono,
    color: C.accent,
  },
  stretchInstructions: {
    marginTop: SPACING.xs,
    lineHeight: 20,
  },
});

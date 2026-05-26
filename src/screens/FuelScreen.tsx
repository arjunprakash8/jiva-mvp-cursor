import React, { useMemo } from 'react';
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
import { Meal, User } from '../types';

interface FuelScreenProps {
  user?: User | null;
}

const MEAL_ORDER: Meal['type'][] = ['breakfast', 'lunch', 'dinner', 'snack'];
const MEAL_LABELS: Record<Meal['type'], string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snacks',
};

const MACRO_TARGETS = { protein: 160, carbs: 220, fat: 70 };

function MacroBar({
  label,
  value,
  target,
  color,
}: {
  label: string;
  value: number;
  target: number;
  color: string;
}) {
  const pct = Math.min((value / target) * 100, 100);

  return (
    <View style={styles.macroRow}>
      <View style={styles.macroHeader}>
        <Text style={T.h3}>{label}</Text>
        <Text style={T.mono}>
          {value}g / {target}g
        </Text>
      </View>
      <View style={styles.macroTrack}>
        <View style={[styles.macroFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default function FuelScreen({ user }: FuelScreenProps) {
  const data = useJivaData(user);

  const balance = data.caloriesIn - data.caloriesOut;
  const balanceLabel = balance >= 0 ? 'Surplus' : 'Deficit';

  const mealsByType = useMemo(() => {
    const grouped: Record<Meal['type'], Meal[]> = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    };
    data.meals.forEach((meal) => grouped[meal.type].push(meal));
    return grouped;
  }, [data.meals]);

  return (
    <View style={styles.container}>
      <DashboardHeader
        title="Fuel"
        subtitle="Nutrition & calorie balance"
        userInitial={user?.name ?? 'J'}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Glass active style={styles.balanceCard}>
          <Text style={T.caption}>CALORIE BALANCE</Text>
          <View style={styles.balanceRow}>
            <View style={styles.balanceCol}>
              <Text style={styles.balanceLabel}>In</Text>
              <Text style={[T.metric, styles.calIn]}>{data.caloriesIn}</Text>
            </View>
            <View style={styles.balanceDivider}>
              <Text style={styles.balanceVs}>vs</Text>
            </View>
            <View style={styles.balanceCol}>
              <Text style={styles.balanceLabel}>Out</Text>
              <Text style={[T.metric, styles.calOut]}>{data.caloriesOut}</Text>
            </View>
          </View>
          <View style={styles.netRow}>
            <Text style={T.body}>
              Net {balanceLabel}:{' '}
              <Text style={{ color: balance >= 0 ? C.warning : C.recovery }}>
                {Math.abs(balance)} cal
              </Text>
            </Text>
          </View>
        </Glass>

        <Glass style={styles.macroCard}>
          <Text style={T.caption}>MACROS</Text>
          <MacroBar
            label="Protein"
            value={data.macros.protein}
            target={MACRO_TARGETS.protein}
            color={C.recovery}
          />
          <MacroBar
            label="Carbs"
            value={data.macros.carbs}
            target={MACRO_TARGETS.carbs}
            color={C.accent}
          />
          <MacroBar
            label="Fat"
            value={data.macros.fat}
            target={MACRO_TARGETS.fat}
            color={C.strain}
          />
        </Glass>

        {MEAL_ORDER.map((type) => {
          const meals = mealsByType[type];
          if (meals.length === 0) return null;

          return (
            <View key={type} style={styles.mealSection}>
              <Text style={T.caption}>{MEAL_LABELS[type].toUpperCase()}</Text>
              {meals.map((meal) => (
                <Glass key={meal.id} style={styles.mealCard}>
                  <View style={styles.mealRow}>
                    <View style={styles.mealInfo}>
                      <Text style={T.h3}>{meal.name}</Text>
                      <Text style={T.body}>
                        {meal.time} · P {meal.protein}g · C {meal.carbs}g · F {meal.fat}g
                      </Text>
                    </View>
                    <Text style={styles.mealCal}>{meal.calories}</Text>
                  </View>
                </Glass>
              ))}
            </View>
          );
        })}

        <TouchableOpacity style={styles.addBtn} activeOpacity={0.7}>
          <JivaIcon name="plus" size={20} color={C.bg} active />
          <Text style={styles.addBtnText}>Add meal</Text>
        </TouchableOpacity>
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
  balanceCard: {
    gap: SPACING.md,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceCol: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  balanceLabel: {
    ...T.caption,
  },
  calIn: {
    color: C.recovery,
  },
  calOut: {
    color: C.strain,
  },
  balanceDivider: {
    paddingHorizontal: SPACING.md,
  },
  balanceVs: {
    ...T.monoSm,
    color: C.textDim,
  },
  netRow: {
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  macroCard: {
    gap: SPACING.md,
  },
  macroRow: {
    gap: SPACING.xs,
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  macroTrack: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  macroFill: {
    height: '100%',
    borderRadius: RADIUS.full,
  },
  mealSection: {
    gap: SPACING.sm,
  },
  mealCard: {
    marginTop: SPACING.xs,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mealInfo: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  mealCal: {
    ...T.metricSm,
    color: C.accent,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: C.accent,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
  },
  addBtnText: {
    ...T.h3,
    color: C.bg,
  },
});

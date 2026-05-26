import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useJivaData } from '../hooks/useJivaData';
import { useMetricHistory } from '../hooks/useMetricHistory';
import { useBle } from '../ble/BleContext';
import Glass from '../components/Glass';
import DashboardHeader from '../components/DashboardHeader';
import SparkLine from '../components/SparkLine';
import JivaIcon, { IconName } from '../components/JivaIcon';
import { C, T, SPACING, RADIUS } from '../constants/theme';
import { TrendPoint, User } from '../types';

interface BiometricsScreenProps {
  user?: User | null;
}

interface MetricConfig {
  key: string;
  label: string;
  value: number;
  unit: string;
  color: string;
  icon: IconName;
  trend: TrendPoint[];
  liveHistory: number[];
}

function trendValues(trend: TrendPoint[]): number[] {
  return trend.map((p) => p.value);
}

function formatTemp(delta: number): string {
  const sign = delta >= 0 ? '+' : '';
  return `${sign}${delta.toFixed(1)}°`;
}

export default function BiometricsScreen({ user }: BiometricsScreenProps) {
  const data = useJivaData(user);
  const { hrHistory } = useBle();

  const hrLive = useMetricHistory(data.hr);
  const hrvLive = useMetricHistory(data.hrv);
  const spo2Live = useMetricHistory(data.spo2);
  const rhrLive = useMetricHistory(data.rhr);
  const tempLive = useMetricHistory(data.skinTemp);
  const respLive = useMetricHistory(data.respRate);

  const metrics: MetricConfig[] = useMemo(
    () => [
      {
        key: 'hr',
        label: 'Heart Rate',
        value: data.hr,
        unit: 'bpm',
        color: C.danger,
        icon: 'heart',
        trend: data.hrTrend,
        liveHistory: hrHistory.length > 0 ? hrHistory : hrLive,
      },
      {
        key: 'hrv',
        label: 'HRV',
        value: data.hrv,
        unit: 'ms',
        color: C.purple,
        icon: 'biometrics',
        trend: data.hrvTrend,
        liveHistory: hrvLive,
      },
      {
        key: 'spo2',
        label: 'SpO₂',
        value: data.spo2,
        unit: '%',
        color: C.accent,
        icon: 'water',
        trend: data.spo2Trend,
        liveHistory: spo2Live,
      },
      {
        key: 'rhr',
        label: 'Resting HR',
        value: data.rhr,
        unit: 'bpm',
        color: C.recovery,
        icon: 'pulse',
        trend: data.rhrTrend,
        liveHistory: rhrLive,
      },
      {
        key: 'temp',
        label: 'Skin Temp',
        value: data.skinTemp,
        unit: 'Δ',
        color: C.warning,
        icon: 'sun',
        trend: data.tempTrend,
        liveHistory: tempLive,
      },
      {
        key: 'resp',
        label: 'Respiration',
        value: data.respRate,
        unit: '/min',
        color: C.sleep,
        icon: 'recovery',
        trend: data.respTrend,
        liveHistory: respLive,
      },
    ],
    [data, hrHistory, hrLive, hrvLive, spo2Live, rhrLive, tempLive, respLive],
  );

  return (
    <View style={styles.container}>
      <DashboardHeader
        title="Biometrics"
        subtitle="Vitals & 30-day trends"
        userInitial={user?.name ?? 'J'}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {metrics.map((metric) => {
          const trendData = trendValues(metric.trend);
          const displayValue =
            metric.key === 'temp' ? formatTemp(metric.value) : String(metric.value);

          return (
            <Glass key={metric.key} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.labelRow}>
                  <JivaIcon name={metric.icon} size={16} color={metric.color} active />
                  <Text style={T.caption}>{metric.label.toUpperCase()}</Text>
                </View>
                <SparkLine
                  data={metric.liveHistory}
                  width={72}
                  height={24}
                  color={metric.color}
                />
              </View>

              <View style={styles.valueRow}>
                <Text style={[T.metric, { color: metric.color }]}>{displayValue}</Text>
                {metric.key !== 'temp' ? (
                  <Text style={styles.unit}>{metric.unit}</Text>
                ) : null}
              </View>

              <View style={styles.trendSection}>
                <Text style={styles.trendLabel}>30-DAY TREND</Text>
                <SparkLine
                  data={trendData}
                  width={280}
                  height={36}
                  color={metric.color}
                  style={styles.trendChart}
                />
                <View style={styles.trendMeta}>
                  <Text style={T.monoSm}>
                    Day 1 · {trendData[0] ?? '—'}
                    {metric.key !== 'temp' ? ` ${metric.unit}` : ''}
                  </Text>
                  <Text style={T.monoSm}>
                    Today · {trendData[trendData.length - 1] ?? '—'}
                    {metric.key !== 'temp' ? ` ${metric.unit}` : ''}
                  </Text>
                </View>
              </View>
            </Glass>
          );
        })}
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
  card: {
    gap: SPACING.sm,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.xs,
  },
  unit: {
    ...T.body,
    fontSize: 13,
  },
  trendSection: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  trendLabel: {
    ...T.monoSm,
    marginBottom: SPACING.xs,
  },
  trendChart: {
    alignSelf: 'center',
  },
  trendMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
});

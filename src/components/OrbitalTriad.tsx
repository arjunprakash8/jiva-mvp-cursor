import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text as SvgText, TSpan } from 'react-native-svg';
import Glass from './Glass';
import { C, T } from '../constants/theme';

interface OrbitalTriadProps {
  recovery: number;
  strain: number;
  sleep: number;
  sleepLabel?: string;
}

const SIZE = 240;
const CX = 120;
const CY = 120;
const SW = 9;

export default function OrbitalTriad({
  recovery,
  strain,
  sleep,
  sleepLabel,
}: OrbitalTriadProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const sleepPct = useMemo(() => {
    if (sleepLabel) {
      const m = sleepLabel.match(/(\d+(?:\.\d+)?)h?\s*(\d+)?m?/);
      if (m) {
        const hours = parseFloat(m[1]);
        const mins = m[2] ? parseInt(m[2], 10) : 0;
        return Math.min((hours + mins / 60) / 12, 1);
      }
    }
    return Math.min(sleep / 100, 1);
  }, [sleep, sleepLabel]);

  const rings = [
    { r: 111, color: C.recovery, pct: Math.min(recovery / 100, 1) },
    { r: 89, color: C.strain, pct: Math.min(strain / 25, 1) },
    { r: 67, color: C.sleep, pct: sleepPct },
  ];

  const displaySleep =
    sleepLabel ??
    (typeof sleep === 'number' && sleep <= 24 ? `${sleep}h` : `${Math.round(sleep)}%`);

  return (
    <Glass active>
      <View style={styles.header}>
        <Text style={T.caption}>TRIAD STATUS</Text>
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <View style={styles.chartWrap}>
        <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {rings.map(({ r, color, pct }) => {
            const circ = 2 * Math.PI * r;
            const off = loaded ? circ * (1 - pct) : circ;
            return (
              <G key={r} rotation="-90" originX={CX} originY={CY}>
                <Circle
                  cx={CX}
                  cy={CY}
                  r={r}
                  fill="none"
                  stroke={color}
                  strokeWidth={SW}
                  strokeOpacity={0.1}
                  strokeLinecap="round"
                />
                <Circle
                  cx={CX}
                  cy={CY}
                  r={r}
                  fill="none"
                  stroke={color}
                  strokeWidth={SW}
                  strokeDasharray={`${circ} ${circ}`}
                  strokeDashoffset={off}
                  strokeLinecap="round"
                />
              </G>
            );
          })}

          <SvgText
            x={CX}
            y={81}
            textAnchor="middle"
            fill={C.recovery}
            fontSize={7}
            letterSpacing={1.4}
            opacity={0.7}
            fontFamily="SpaceGrotesk_300Light"
          >
            RECOVERY
          </SvgText>
          <SvgText
            x={CX}
            y={102}
            textAnchor="middle"
            fill={C.recovery}
            fontSize={18}
            fontFamily="SpaceGrotesk_700Bold"
          >
            {Math.round(recovery)}%
          </SvgText>

          <SvgText
            x={CX}
            y={119}
            textAnchor="middle"
            fill={C.strain}
            fontSize={7}
            letterSpacing={1.4}
            opacity={0.7}
            fontFamily="SpaceGrotesk_300Light"
          >
            STRAIN
          </SvgText>
          <SvgText
            x={CX}
            y={136}
            textAnchor="middle"
            fill={C.strain}
            fontSize={14}
            fontFamily="SpaceGrotesk_700Bold"
          >
            {strain}
            <TSpan fill={C.textDim} fontSize={10} fontFamily="SpaceGrotesk_300Light">
              {' '}
              / 25
            </TSpan>
          </SvgText>

          <SvgText
            x={CX}
            y={153}
            textAnchor="middle"
            fill={C.sleep}
            fontSize={7}
            letterSpacing={1.4}
            opacity={0.7}
            fontFamily="SpaceGrotesk_300Light"
          >
            SLEEP
          </SvgText>
          <SvgText
            x={CX}
            y={167}
            textAnchor="middle"
            fill={C.sleep}
            fontSize={11}
            fontFamily="SpaceGrotesk_400Regular"
          >
            {displaySleep}
          </SvgText>
        </Svg>
      </View>
    </Glass>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: `${C.accent}44`,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.accent,
  },
  liveText: {
    ...T.monoSm,
    color: C.accent,
    fontSize: 9,
    letterSpacing: 1,
  },
  chartWrap: {
    alignItems: 'center',
  },
});

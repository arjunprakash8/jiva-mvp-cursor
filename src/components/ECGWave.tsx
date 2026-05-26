import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { G, Line, Path, Polyline } from 'react-native-svg';
import { C, T } from '../constants/theme';

interface ECGWaveProps {
  bpm: number;
  samples?: number[];
  width?: number;
  height?: number;
}

const SYNTHETIC_D =
  'M0,26 L18,26 L22,24 L26,11 L29,38 L32,4 L35,42 L38,26 ' +
  'L72,26 L90,26 L94,24 L98,11 L101,38 L104,4 L107,42 L110,26 ' +
  'L144,26 L162,26 L166,24 L170,11 L173,38 L176,4 L179,42 L182,26 ' +
  'L216,26 L234,26 L238,24 L242,11 L245,38 L248,4 L251,42 L254,26 ' +
  'L288,26 L306,26 L310,24 L314,11 L317,38 L320,4 L323,42 L326,26 L360,26';

function buildPolylinePoints(
  samples: number[],
  width: number,
  height: number,
  padding = 4,
): string {
  const min = Math.min(...samples);
  const max = Math.max(...samples);
  const range = max - min || 1;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  const midY = height / 2;

  return samples
    .map((v, i) => {
      const x = padding + (i / Math.max(samples.length - 1, 1)) * innerW;
      const y = midY - ((v - min) / range - 0.5) * innerH * 0.85;
      return `${x},${y}`;
    })
    .join(' ');
}

export default function ECGWave({
  bpm,
  samples = [],
  width = 360,
  height = 52,
}: ECGWaveProps) {
  const scroll = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const useLive = samples.length >= 60;

  const livePoints = useMemo(
    () => (useLive ? buildPolylinePoints(samples.slice(-60), width, height) : ''),
    [useLive, samples, width, height],
  );

  useEffect(() => {
    const beatMs = Math.max(400, Math.round(60000 / Math.max(bpm, 40)));
    const scrollLoop = Animated.loop(
      Animated.timing(scroll, {
        toValue: 1,
        duration: beatMs * 2,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.35,
          duration: beatMs * 0.15,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: beatMs * 0.35,
          useNativeDriver: true,
        }),
        Animated.delay(beatMs * 0.5),
      ]),
    );

    scrollLoop.start();
    pulseLoop.start();
    return () => {
      scrollLoop.stop();
      pulseLoop.stop();
    };
  }, [bpm, scroll, pulse]);

  const translateX = scroll.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width],
  });

  const gridLines = [0, 1, 2, 3].map((i) => (
    <Line
      key={i}
      x1={0}
      y1={i * 13 + 2}
      x2={width}
      y2={i * 13 + 2}
      stroke="rgba(0,242,255,0.04)"
      strokeWidth={0.5}
    />
  ));

  return (
    <View style={[styles.wrap, { height }]}>
      <Animated.View
        style={[
          styles.waveLayer,
          !useLive && { transform: [{ translateX }] },
          { opacity: pulse },
        ]}
      >
        <Svg
          width={useLive ? width : width * 2}
          height={height}
          viewBox={`0 0 ${useLive ? width : width * 2} ${height}`}
        >
          {gridLines}
          {useLive ? (
            <Polyline
              points={livePoints}
              fill="none"
              stroke={C.accent}
              strokeWidth={1.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ) : (
            <G>
              <Path
                d={SYNTHETIC_D}
                fill="none"
                stroke={C.accent}
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <Path
                d={SYNTHETIC_D}
                fill="none"
                stroke={C.accent}
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                transform={`translate(${width}, 0)`}
              />
            </G>
          )}
        </Svg>
      </Animated.View>

      <View style={styles.bpmWrap}>
        <Animated.View style={[styles.bpmDot, { opacity: pulse }]} />
        <Text style={styles.bpmValue}>{bpm}</Text>
        <Text style={styles.bpmLabel}>BPM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  },
  waveLayer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  bpmWrap: {
    position: 'absolute',
    right: 0,
    bottom: 2,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  bpmDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.danger,
    marginBottom: 1,
  },
  bpmValue: {
    ...T.mono,
    color: C.danger,
    fontSize: 16,
  },
  bpmLabel: {
    ...T.caption,
    fontSize: 9,
  },
});

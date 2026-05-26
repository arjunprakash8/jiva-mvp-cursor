import React, { useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Svg, { Circle, Polyline } from 'react-native-svg';
import { C } from '../constants/theme';

interface SparkLineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  padding?: number;
  style?: StyleProp<ViewStyle>;
}

export default function SparkLine({
  data,
  width = 90,
  height = 28,
  color = C.accent,
  padding = 3,
  style,
}: SparkLineProps) {
  const { points, last } = useMemo(() => {
    if (!data.length) return { points: '', last: null as { x: number; y: number } | null };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const innerW = width - padding * 2;
    const innerH = height - padding * 2;

    const pts = data
      .map((v, i) => {
        const x = padding + (i / Math.max(data.length - 1, 1)) * innerW;
        const y = padding + innerH - ((v - min) / range) * innerH;
        return `${x},${y}`;
      })
      .join(' ');

    const lastPt = data[data.length - 1];
    const lx = padding + innerW;
    const ly = padding + innerH - ((lastPt - min) / range) * innerH;

    return { points: pts, last: { x: lx, y: ly } };
  }, [data, width, height, padding]);

  if (!data.length || !points) return null;

  return (
    <View style={style}>
      <Svg width={width} height={height}>
        <Polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {last ? <Circle cx={last.x} cy={last.y} r={2.5} fill={color} /> : null}
      </Svg>
    </View>
  );
}

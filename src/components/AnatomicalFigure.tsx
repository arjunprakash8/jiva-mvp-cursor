import React, { useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  Line,
  Path,
  Rect,
  Text as SvgText,
} from 'react-native-svg';
import { C } from '../constants/theme';

export type MuscleGroup =
  | 'chest'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'back'
  | 'core'
  | 'hip-flexors'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'lats'
  | 'arms'
  | 'full';

interface ActivityLoad {
  muscles: string[];
  strain: number;
}

interface AnatomicalFigureProps {
  activities?: ActivityLoad[];
  highlighted?: MuscleGroup[];
  loads?: Partial<Record<MuscleGroup, number>>;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const MUSCLE_PATHS: Record<string, string> = {
  chest: 'M70,75 C72,70 83,68 100,71 L100,115 C90,121 70,117 70,103 Z M130,75 C128,70 117,68 100,71 L100,115 C110,121 130,117 130,103 Z',
  shoulders:
    'M62,69 C54,72 46,83 46,97 C48,108 58,114 66,110 L66,89 C64,81 62,74 62,69 Z M138,69 C146,72 154,83 154,97 C152,108 142,114 134,110 L134,89 C136,81 138,74 138,69 Z',
  biceps:
    'M46,101 C42,112 42,130 46,142 C50,150 60,152 66,146 L66,132 C62,126 58,116 58,106 Z M154,101 C158,112 158,130 154,142 C150,150 140,152 134,146 L134,132 C138,126 142,116 142,106 Z',
  triceps:
    'M44,100 C40,110 40,128 44,140 L50,136 C46,126 46,112 50,102 Z M156,100 C160,110 160,128 156,140 L150,136 C154,126 154,112 150,102 Z',
  back: 'M97,65 C96,108 96,178 97,200 L103,200 C104,178 104,108 103,65 Z',
  core: 'M88,120 L112,120 L110,175 L90,175 Z',
  'hip-flexors':
    'M76,192 C74,202 76,216 82,221 L96,221 L94,207 L88,194 Z M124,192 C126,202 124,216 118,221 L104,221 L106,207 L112,194 Z',
  quads:
    'M70,221 C68,251 70,279 72,294 L82,292 C80,272 80,246 80,221 Z M80,221 C80,246 80,272 82,292 L94,290 C92,270 90,246 90,221 Z M130,221 C132,251 130,279 128,294 L118,292 C120,272 120,246 120,221 Z M120,221 C120,246 120,272 118,292 L106,290 C108,270 110,246 110,221 Z',
  hamstrings:
    'M64,217 C62,249 64,281 68,295 L72,293 C70,277 70,247 68,217 Z M136,217 C138,249 136,281 132,295 L128,293 C130,277 130,247 132,217 Z',
  glutes:
    'M70,200 C68,211 68,221 74,225 L90,225 L90,211 L80,205 Z M130,200 C132,211 132,221 126,225 L110,225 L110,211 L120,205 Z',
  calves:
    'M70,300 C66,321 68,346 72,354 L82,354 C86,344 86,320 82,300 Z M130,300 C134,321 132,346 128,354 L118,354 C114,344 114,320 118,300 Z',
  lats: 'M62,90 C55,110 55,140 68,155 L72,120 C68,105 64,95 62,90 Z M138,90 C145,110 145,140 132,155 L128,120 C132,105 136,95 138,90 Z',
  arms: 'M46,101 C42,130 46,152 66,146 L66,100 Z M154,101 C158,130 154,152 134,146 L134,100 Z',
  full: 'M50,70 C45,120 45,180 55,250 L145,250 C155,180 155,120 150,70 Z',
};

const BODY_SILHOUETTE = [
  { type: 'circle' as const, props: { cx: 100, cy: 27, r: 21 } },
  {
    type: 'path' as const,
    d: 'M91,46 L109,46 L107,61 L93,61 Z',
  },
  {
    type: 'path' as const,
    d: 'M62,61 C54,65 44,77 44,89 L44,96 L56,96 C56,84 62,78 68,74 L68,199 Q68,206 74,206 L126,206 Q132,206 132,199 L132,74 C138,78 144,84 144,96 L156,96 L156,89 C156,77 146,65 138,61 Z',
  },
  {
    type: 'path' as const,
    d: 'M68,206 L90,206 L88,296 L68,296 Q62,289 66,264 Z M132,206 L110,206 L112,296 L132,296 Q138,289 134,264 Z',
  },
  {
    type: 'path' as const,
    d: 'M68,296 L88,296 L86,352 Q82,357 78,357 Q72,355 68,349 Z M132,296 L112,296 L114,352 Q118,357 122,357 Q128,355 132,349 Z',
  },
];

function MuscleOverlay({
  id,
  load,
  forced,
}: {
  id: string;
  load: number;
  forced: boolean;
}) {
  const d = MUSCLE_PATHS[id];
  if (!d) return null;

  const t = forced ? 1 : Math.min(load, 1);
  if (t <= 0 && !forced) {
    return (
      <Path
        d={d}
        fill="rgba(0,242,255,0.015)"
        stroke="rgba(0,242,255,0.06)"
        strokeWidth={0.5}
      />
    );
  }

  return (
    <Path
      d={d}
      fill={`rgba(0,242,255,${(0.08 + t * 0.58).toFixed(2)})`}
      stroke={C.accent}
      strokeWidth={0.4 + t}
      strokeOpacity={0.22 + t * 0.72}
    />
  );
}

export default function AnatomicalFigure({
  activities = [],
  highlighted = [],
  loads: loadOverrides,
  width = 118,
  height = 212,
  style,
}: AnatomicalFigureProps) {
  const muscleLoads = useMemo(() => {
    const ml: Record<string, number> = { ...(loadOverrides as Record<string, number>) };
    activities.forEach((a) => {
      a.muscles.forEach((m) => {
        ml[m] = (ml[m] || 0) + a.strain;
      });
    });
    highlighted.forEach((m) => {
      if (ml[m] == null) ml[m] = 1;
    });
    return ml;
  }, [activities, highlighted, loadOverrides]);

  const maxLoad = Math.max(...Object.values(muscleLoads), 0.01);
  const topEntry = Object.entries(muscleLoads).sort((a, b) => b[1] - a[1])[0];
  const tensionLevel = topEntry
    ? topEntry[1] / maxLoad > 0.65
      ? 'High Load'
      : topEntry[1] / maxLoad > 0.3
        ? 'Moderate'
        : 'Active'
    : null;

  return (
    <View style={style}>
      <Svg width={width} height={height} viewBox="0 0 200 360">
        <Rect x="0" y="0" width="200" height="360" fill="rgba(0,242,255,0.02)" />
        <Line
          x1="100"
          y1="4"
          x2="100"
          y2="330"
          stroke="rgba(0,242,255,0.055)"
          strokeWidth={0.4}
          strokeDasharray="3,7"
        />

        <G fill="rgba(15,23,42,0.9)" stroke="rgba(0,242,255,0.2)" strokeWidth={0.8}>
          {BODY_SILHOUETTE.map((part, i) =>
            part.type === 'circle' ? (
              <Circle key={i} {...part.props} />
            ) : (
              <Path key={i} d={part.d} />
            ),
          )}
        </G>

        <Ellipse
          cx="79"
          cy="294"
          rx="8"
          ry="5"
          fill="rgba(0,242,255,0.05)"
          stroke="rgba(0,242,255,0.24)"
          strokeWidth={0.5}
        />
        <Ellipse
          cx="121"
          cy="294"
          rx="8"
          ry="5"
          fill="rgba(0,242,255,0.05)"
          stroke="rgba(0,242,255,0.24)"
          strokeWidth={0.5}
        />

        {Object.keys(MUSCLE_PATHS).map((muscle) => (
          <MuscleOverlay
            key={muscle}
            id={muscle}
            load={(muscleLoads[muscle] || 0) / maxLoad}
            forced={highlighted.includes(muscle as MuscleGroup)}
          />
        ))}

        {topEntry ? (
          <G>
            <Rect
              x="14"
              y="332"
              width="172"
              height="24"
              rx="3"
              fill="rgba(4,8,22,0.82)"
              stroke="rgba(0,242,255,0.16)"
              strokeWidth={0.5}
            />
            <SvgText
              x="24"
              y="341"
              fill={C.accent}
              fontSize={5.5}
              fontFamily="SpaceGrotesk_300Light"
              letterSpacing={1.8}
              opacity={0.65}
            >
              ESTIMATED TENSION
            </SvgText>
            <SvgText
              x="24"
              y="352"
              fill={C.text}
              fontSize={9}
              fontFamily="SpaceGrotesk_600SemiBold"
            >
              {topEntry[0]} · {tensionLevel}
            </SvgText>
          </G>
        ) : null}

        <G stroke={C.accent} strokeWidth={1.1} strokeOpacity={0.42} fill="none">
          <Path d="M28,4 L28,18 M28,4 L42,4" />
          <Path d="M172,4 L172,18 M172,4 L158,4" />
          <Path d="M28,356 L28,342 M28,356 L42,356" />
          <Path d="M172,356 L172,342 M172,356 L158,356" />
        </G>
      </Svg>
    </View>
  );
}

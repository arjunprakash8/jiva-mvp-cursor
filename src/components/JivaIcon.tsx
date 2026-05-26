import React from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
} from 'react-native-svg';
import { C } from '../constants/theme';

export type IconName =
  | 'pulse'
  | 'biometrics'
  | 'activity'
  | 'fuel'
  | 'recovery'
  | 'hub'
  | 'heart'
  | 'run'
  | 'cycle'
  | 'swim'
  | 'lift'
  | 'yoga'
  | 'hiit'
  | 'walk'
  | 'tennis'
  | 'chevron'
  | 'plus'
  | 'send'
  | 'bluetooth'
  | 'user'
  | 'moon'
  | 'sun'
  | 'fire'
  | 'water'
  | 'chat';

interface JivaIconProps {
  name: IconName;
  size?: number;
  color?: string;
  active?: boolean;
}

const STROKE = 1;

function IconPaths({ name, col }: { name: IconName; col: string }) {
  switch (name) {
    case 'pulse':
      return (
        <G>
          <Line x1="12" y1="15" x2="12" y2="7" stroke={col} strokeOpacity={0.9} />
          <Line x1="12" y1="7" x2="17" y2="11" stroke={col} strokeOpacity={0.35} />
          <Circle cx="12" cy="15" r="1.5" fill={col} stroke="none" />
          <Path d="M8.5,15 A3.5,3.5 0 0,1 15.5,15" stroke={col} fill="none" />
          <Path d="M5.5,15 A6.5,6.5 0 0,1 18.5,15" stroke={col} fill="none" />
          <Path d="M2.5,15 A9.5,9.5 0 0,1 21.5,15" stroke={col} fill="none" />
        </G>
      );
    case 'biometrics':
      return (
        <G>
          {[
            [12, 4],
            [18, 8],
            [18, 16],
            [12, 20],
            [6, 16],
            [6, 8],
          ].map(([cx, cy], i) => (
            <Circle key={i} cx={cx} cy={cy} r={1.4} fill={col} stroke="none" />
          ))}
          <Circle cx="12" cy="12" r="1.8" fill={col} stroke="none" />
          <Line x1="12" y1="4" x2="12" y2="10.2" stroke={col} strokeOpacity={0.7} />
          <Line x1="18" y1="8" x2="13.2" y2="11" stroke={col} strokeOpacity={0.7} />
          <Line x1="18" y1="16" x2="13.2" y2="13" stroke={col} strokeOpacity={0.7} />
          <Line x1="12" y1="20" x2="12" y2="13.8" stroke={col} strokeOpacity={0.7} />
          <Line x1="6" y1="16" x2="10.8" y2="13" stroke={col} strokeOpacity={0.7} />
          <Line x1="6" y1="8" x2="10.8" y2="11" stroke={col} strokeOpacity={0.7} />
        </G>
      );
    case 'activity':
    case 'run':
      return (
        <G>
          <Circle cx="15" cy="4" r="1.6" stroke={col} fill="none" />
          <Path d="M15,5.6 L12.5,10 L9,14.5" stroke={col} fill="none" />
          <Path d="M12.5,10 L16,13.5 L19,15.5" stroke={col} fill="none" />
          <Path d="M15,5.6 L10.5,8 L8,7.5" stroke={col} fill="none" />
          <Path d="M15,5.6 L17.5,8.5" stroke={col} fill="none" />
          <Line x1="2" y1="12.5" x2="5.5" y2="12.5" stroke={col} strokeOpacity={0.4} />
          <Line x1="2" y1="15" x2="4.5" y2="15" stroke={col} strokeOpacity={0.25} />
        </G>
      );
    case 'fuel':
      return (
        <G>
          <Circle cx="12" cy="12" r="2" fill={col} stroke="none" />
          <Ellipse cx="12" cy="12" rx="9" ry="3.5" stroke={col} fill="none" />
          <G rotation="60" originX={12} originY={12}>
            <Ellipse cx="12" cy="12" rx="9" ry="3.5" stroke={col} fill="none" />
          </G>
          <G rotation="-60" originX={12} originY={12}>
            <Ellipse cx="12" cy="12" rx="9" ry="3.5" stroke={col} fill="none" />
          </G>
        </G>
      );
    case 'recovery':
      return (
        <G>
          <Circle cx="12" cy="12" r="9" stroke={col} fill="none" />
          <Path
            d="M4.5,12 L6,12 L7,10 L8.5,14 L10,8.5 L11.5,15.5 L13,12 L15,12"
            stroke={col}
            strokeOpacity={0.9}
            fill="none"
          />
        </G>
      );
    case 'hub':
      return (
        <G>
          <Circle cx="12" cy="5" r="2.5" stroke={col} fill="none" />
          <Circle cx="4.5" cy="18" r="2.5" stroke={col} fill="none" />
          <Circle cx="19.5" cy="18" r="2.5" stroke={col} fill="none" />
          <Line x1="12" y1="7.5" x2="6" y2="15.8" stroke={col} />
          <Line x1="12" y1="7.5" x2="18" y2="15.8" stroke={col} />
          <Line x1="7" y1="18" x2="17" y2="18" stroke={col} />
        </G>
      );
    case 'heart':
      return (
        <Path
          d="M20.84,4.61a5.5,5.5,0,0,0-7.78,0L12,5.67l-1.06-1.06a5.5,5.5,0,0,0-7.78,7.78l1.06,1.06L12,21.23l7.78-7.78,1.06-1.06a5.5,5.5,0,0,0,0-7.78z"
          fill={col}
          stroke="none"
        />
      );
    case 'lift':
      return (
        <G>
          <Line x1="6" y1="12" x2="18" y2="12" stroke={col} />
          <Line x1="5.5" y1="8.5" x2="5.5" y2="15.5" stroke={col} />
          <Line x1="3.5" y1="9.5" x2="3.5" y2="14.5" stroke={col} />
          <Line x1="18.5" y1="8.5" x2="18.5" y2="15.5" stroke={col} />
          <Line x1="20.5" y1="9.5" x2="20.5" y2="14.5" stroke={col} />
          <Line x1="9.5" y1="10" x2="9.5" y2="14" stroke={col} />
          <Line x1="14.5" y1="10" x2="14.5" y2="14" stroke={col} />
        </G>
      );
    case 'cycle':
      return (
        <G>
          <Circle cx="7" cy="17" r="4" stroke={col} fill="none" />
          <Circle cx="17" cy="17" r="4" stroke={col} fill="none" />
          <Line x1="11" y1="17" x2="13" y2="17" stroke={col} />
          <Path d="M11,17 L12,8 L15,6 L17,8" stroke={col} fill="none" />
        </G>
      );
    case 'swim':
      return (
        <G>
          <Path d="M4,14 Q8,10 12,14 Q16,18 20,14" stroke={col} fill="none" />
          <Path d="M4,18 Q8,14 12,18 Q16,22 20,18" stroke={col} fill="none" />
          <Circle cx="18" cy="8" r="1.8" stroke={col} fill="none" />
          <Path d="M18,9.8 L15,12" stroke={col} fill="none" />
        </G>
      );
    case 'yoga':
      return (
        <G>
          <Circle cx="12" cy="5" r="2" stroke={col} fill="none" />
          <Path d="M12,7 L8,14 L12,20 L16,14 Z" stroke={col} fill="none" />
          <Line x1="8" y1="14" x2="16" y2="14" stroke={col} />
        </G>
      );
    case 'hiit':
      return (
        <Path d="M13.5,2 L8.5,12 L12,12 L9.5,22 L17.5,10 L14,10 Z" fill={col} stroke="none" />
      );
    case 'walk':
      return (
        <G>
          <Circle cx="12" cy="4" r="1.8" stroke={col} fill="none" />
          <Line x1="12" y1="5.8" x2="12" y2="14" stroke={col} />
          <Line x1="12" y1="9" x2="9" y2="12" stroke={col} />
          <Line x1="12" y1="9" x2="15" y2="12" stroke={col} />
          <Line x1="12" y1="14" x2="10" y2="21" stroke={col} />
          <Line x1="12" y1="14" x2="14" y2="21" stroke={col} />
        </G>
      );
    case 'tennis':
      return (
        <G>
          <Circle cx="8" cy="8" r="5" stroke={col} fill="none" />
          <Line x1="11" y1="11" x2="20" y2="20" stroke={col} />
          <Path d="M5,8 Q8,5 11,8" stroke={col} fill="none" />
        </G>
      );
    case 'chevron':
      return <Polyline points="9,6 15,12 9,18" stroke={col} fill="none" />;
    case 'plus':
      return (
        <G>
          <Line x1="12" y1="5" x2="12" y2="19" stroke={col} />
          <Line x1="5" y1="12" x2="19" y2="12" stroke={col} />
        </G>
      );
    case 'send':
      return (
        <G>
          <Line x1="22" y1="2" x2="11" y2="13" stroke={col} />
          <Polygon points="22,2 15,22 11,13 2,9" fill={col} stroke="none" />
        </G>
      );
    case 'bluetooth':
      return (
        <Path
          d="M7,7 L12,12 L7,17 L7,7 M12,12 L17,7 L12,12 M12,12 L17,17"
          stroke={col}
          fill="none"
        />
      );
    case 'user':
      return (
        <G>
          <Circle cx="12" cy="8" r="4" stroke={col} fill="none" />
          <Path d="M4,22 Q4,16 12,16 Q20,16 20,22" stroke={col} fill="none" />
        </G>
      );
    case 'moon':
      return (
        <Path
          d="M21,12.79A9,9,0,1,1,11.21,3,7,7,0,0,0,21,12.79z"
          stroke={col}
          fill="none"
        />
      );
    case 'sun':
      return (
        <G>
          <Circle cx="12" cy="12" r="4" stroke={col} fill="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 12 + Math.cos(rad) * 7;
            const y1 = 12 + Math.sin(rad) * 7;
            const x2 = 12 + Math.cos(rad) * 9.5;
            const y2 = 12 + Math.sin(rad) * 9.5;
            return <Line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} />;
          })}
        </G>
      );
    case 'fire':
      return (
        <Path
          d="M12,22 C8,18 6,14 8,10 C9,8 10,9 12,6 C14,9 15,8 16,10 C18,14 16,18 12,22 Z"
          fill={col}
          stroke="none"
        />
      );
    case 'water':
      return (
        <Path
          d="M12,3 C8,9 5,12 5,16 A7,7,0,0,0,19,16 C19,12 16,9 12,3 Z"
          stroke={col}
          fill="none"
        />
      );
    case 'chat':
      return (
        <G>
          <Path
            d="M4,5 H20 V15 H9 L4,19 V5 Z"
            stroke={col}
            fill="none"
          />
          <Line x1="8" y1="9" x2="16" y2="9" stroke={col} />
          <Line x1="8" y1="12" x2="14" y2="12" stroke={col} />
        </G>
      );
    default:
      return null;
  }
}

export default function JivaIcon({
  name,
  size = 20,
  color = C.textDim,
  active = false,
}: JivaIconProps) {
  const col = active ? C.accent : color;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={col}
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <IconPaths name={name} col={col} />
    </Svg>
  );
}

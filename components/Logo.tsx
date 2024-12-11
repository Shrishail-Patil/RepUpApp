import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../theme/theme';

interface LogoProps {
  width: number;
  height: number;
}

export default function Logo({ width, height }: LogoProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={colors.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 6V12L16 14"
        stroke={colors.secondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}



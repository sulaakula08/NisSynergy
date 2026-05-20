export const colors = {
  background: '#0A0E17',
  surface: '#121A2B',
  surfaceElevated: '#1A2540',
  border: '#2A3F5F',
  text: '#E8F4FF',
  textMuted: '#7B9BB8',
  water: '#0D47A1',
  waterLight: '#1565C0',
  safe: '#00E676',
  safeDim: '#00E67633',
  warning: '#FFD600',
  warningDim: '#FFD60033',
  danger: '#FF3D00',
  dangerDim: '#FF3D0033',
  accent: '#00B0FF',
  neon: '#39FF14',
  purple: '#7C4DFF',
  white: '#FFFFFF',
  black: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const typography = {
  hero: { fontSize: 32, fontWeight: '800' as const, letterSpacing: -0.5 },
  title: { fontSize: 22, fontWeight: '700' as const },
  subtitle: { fontSize: 16, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '500' as const },
  mono: { fontSize: 13, fontWeight: '600' as const, fontFamily: 'SpaceMono' },
};

export type RiskLevel = 'safe' | 'medium' | 'high';

export function riskColor(level: RiskLevel): string {
  switch (level) {
    case 'safe':
      return colors.safe;
    case 'medium':
      return colors.warning;
    case 'high':
      return colors.danger;
  }
}

export function riskLabel(level: RiskLevel): string {
  switch (level) {
    case 'safe':
      return 'Безопасно';
    case 'medium':
      return 'Средний риск';
    case 'high':
      return 'Высокий риск';
  }
}

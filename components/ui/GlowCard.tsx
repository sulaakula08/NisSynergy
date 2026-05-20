import { StyleSheet, View, type ViewProps } from 'react-native';
import { colors, radius } from '@/constants/theme';

interface GlowCardProps extends ViewProps {
  glowColor?: string;
}

export function GlowCard({ children, style, glowColor = colors.accent, ...rest }: GlowCardProps) {
  return (
    <View style={[styles.wrap, { borderColor: glowColor + '44' }, style]} {...rest}>
      <View style={[styles.glow, { backgroundColor: glowColor + '18' }]} />
      <View style={styles.inner}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  inner: {
    padding: 16,
  },
});

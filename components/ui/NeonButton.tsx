import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { safeImpact } from '@/lib/safeHaptics';
import { colors, radius } from '@/constants/theme';

type Variant = 'primary' | 'danger' | 'safe' | 'ghost';

interface NeonButtonProps extends PressableProps {
  label: string;
  variant?: Variant;
  icon?: React.ReactNode;
}

const gradients: Record<Variant, [string, string]> = {
  primary: [colors.waterLight, colors.accent],
  danger: ['#FF6E40', colors.danger],
  safe: ['#69F0AE', colors.safe],
  ghost: [colors.surfaceElevated, colors.surface],
};

export function NeonButton({
  label,
  variant = 'primary',
  icon,
  onPress,
  disabled,
  style: outerStyle,
  ...rest
}: NeonButtonProps) {
  return (
    <Pressable
      onPress={(e) => {
        if (!disabled) safeImpact();
        onPress?.(e);
      }}
      disabled={disabled}
      style={({ pressed }) => [
        styles.wrap,
        pressed && styles.pressed,
        disabled && styles.disabled,
        outerStyle as object,
      ]}
      {...rest}
    >
      <LinearGradient colors={gradients[variant]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: radius.md, overflow: 'hidden' },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.5 },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  label: { color: colors.white, fontSize: 15, fontWeight: '700' },
});

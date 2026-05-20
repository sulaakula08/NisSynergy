import { StyleSheet, Text, View } from 'react-native';
import type { RiskLevel } from '@/constants/theme';
import { riskColor, riskLabel, colors, radius } from '@/constants/theme';

export function RiskBadge({ level, compact }: { level: RiskLevel; compact?: boolean }) {
  const c = riskColor(level);
  return (
    <View style={[styles.badge, { backgroundColor: c + '22', borderColor: c }, compact && styles.compact]}>
      <View style={[styles.dot, { backgroundColor: c }]} />
      <Text style={[styles.text, { color: c }, compact && styles.textCompact]}>{riskLabel(level)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  compact: { paddingVertical: 4, paddingHorizontal: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  text: { fontSize: 12, fontWeight: '700' },
  textCompact: { fontSize: 10 },
});

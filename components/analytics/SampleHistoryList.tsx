import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { PollutionPoint } from '@/types';
import { colors, riskColor } from '@/constants/theme';
import { RiskBadge } from '@/components/ui/RiskBadge';

interface SampleHistoryListProps {
  points: PollutionPoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SampleHistoryList({ points, selectedId, onSelect }: SampleHistoryListProps) {
  return (
    <View style={styles.list}>
      {points.map((p) => (
        <Pressable
          key={p.id}
          onPress={() => onSelect(p.id)}
          style={[styles.row, selectedId === p.id && styles.rowActive]}
        >
          <View style={[styles.icon, { backgroundColor: riskColor(p.risk) + '33' }]}>
            <FontAwesome name="tint" size={16} color={riskColor(p.risk)} />
          </View>
          <View style={styles.body}>
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.dates}>
              {p.history.length} проб · последняя {p.lastSampleDate}
            </Text>
          </View>
          <RiskBadge level={p.risk} compact />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowActive: { borderColor: colors.accent, backgroundColor: colors.surfaceElevated },
  icon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1 },
  name: { color: colors.text, fontSize: 14, fontWeight: '600' },
  dates: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
});

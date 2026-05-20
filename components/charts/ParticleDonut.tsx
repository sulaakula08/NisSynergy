import Svg, { Circle, G } from 'react-native-svg';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

interface ParticleDonutProps {
  fibers: number;
  fragments: number;
  film: number;
  size?: number;
}

const SEGMENTS = [
  { key: 'fibers', color: colors.accent, label: 'Волокна' },
  { key: 'fragments', color: colors.warning, label: 'Фрагменты' },
  { key: 'film', color: colors.purple, label: 'Плёнка' },
] as const;

export function ParticleDonut({ fibers, fragments, film, size = 160 }: ParticleDonutProps) {
  const values = [fibers, fragments, film];
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const r = (size - 20) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const stroke = 14;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <View style={styles.wrap}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${cx}, ${cy}`}>
          <Circle cx={cx} cy={cy} r={r} stroke={colors.surfaceElevated} strokeWidth={stroke} fill="none" />
          {values.map((v, i) => {
            const dash = (v / total) * circumference;
            const el = (
              <Circle
                key={SEGMENTS[i].key}
                cx={cx}
                cy={cy}
                r={r}
                stroke={SEGMENTS[i].color}
                strokeWidth={stroke}
                fill="none"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
              />
            );
            offset += dash;
            return el;
          })}
        </G>
      </Svg>
      <View style={[styles.center, { width: size, height: size }]}>
        <Text style={styles.total}>{total}%</Text>
        <Text style={styles.hint}>классификация</Text>
      </View>
      <View style={styles.legend}>
        {SEGMENTS.map((s, i) => (
          <View key={s.key} style={styles.legendRow}>
            <View style={[styles.swatch, { backgroundColor: s.color }]} />
            <Text style={styles.legendText}>
              {s.label} — {values[i]}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center' },
  center: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
  total: { color: colors.text, fontSize: 22, fontWeight: '800' },
  hint: { color: colors.textMuted, fontSize: 10 },
  legend: { marginTop: 16, width: '100%', gap: 8 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  swatch: { width: 10, height: 10, borderRadius: 2 },
  legendText: { color: colors.text, fontSize: 13 },
});

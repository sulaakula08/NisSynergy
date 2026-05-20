import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { PollutionMap } from '@/components/map/PollutionMap';
import { colors, spacing } from '@/constants/theme';

export default function EcologistMapScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <Text style={styles.brand}>NIS ENERGY</Text>
        <Text style={styles.title}>Тепловая карта микропластика</Text>
        <Text style={styles.sub}>Ниш · интерактивные зоны риска в реальном времени (демо)</Text>
      </Animated.View>
      <View style={styles.mapWrap}>
        <PollutionMap />
      </View>
      <View style={styles.legend}>
        {(['safe', 'medium', 'high'] as const).map((level) => (
          <View key={level} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: level === 'safe' ? colors.safe : level === 'medium' ? colors.warning : colors.danger }]} />
            <Text style={styles.legendText}>
              {level === 'safe' ? 'Безопасно' : level === 'medium' ? 'Средний' : 'Высокий'}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md },
  brand: { color: colors.neon, fontSize: 10, fontWeight: '800', letterSpacing: 3 },
  title: { color: colors.text, fontSize: 20, fontWeight: '800', marginTop: 4 },
  sub: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  mapWrap: { flex: 1, marginHorizontal: spacing.md, marginBottom: spacing.sm, borderRadius: 16, overflow: 'hidden' },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 20, paddingBottom: spacing.md },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { color: colors.textMuted, fontSize: 11 },
});

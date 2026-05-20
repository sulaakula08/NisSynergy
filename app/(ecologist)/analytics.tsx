import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { POLLUTION_POINTS } from '@/constants/mockData';
import { SampleHistoryList } from '@/components/analytics/SampleHistoryList';
import { BeforeAfterSlider } from '@/components/charts/BeforeAfterSlider';
import { NeonButton } from '@/components/ui/NeonButton';
import { PdfExportLoader } from '@/components/ui/PdfExportLoader';
import { GlowCard } from '@/components/ui/GlowCard';
import { usePdfExport } from '@/hooks/usePdfExport';
import { colors, spacing } from '@/constants/theme';

export default function AnalyticsScreen() {
  const [selectedId, setSelectedId] = useState(POLLUTION_POINTS[0].id);
  const { exporting, success, exportPdf } = usePdfExport();

  const point = useMemo(() => POLLUTION_POINTS.find((p) => p.id === selectedId)!, [selectedId]);
  const before = point.history[0];
  const after = point.history[point.history.length - 1];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <PdfExportLoader visible={exporting} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeIn}>
          <Text style={styles.title}>История проб</Text>
          <Text style={styles.sub}>Сравнение «До / После» и экспорт для жюри</Text>
        </Animated.View>

        <SampleHistoryList points={POLLUTION_POINTS} selectedId={selectedId} onSelect={setSelectedId} />

        <Animated.View entering={FadeInRight.delay(150)} style={styles.compare}>
          <GlowCard glowColor={colors.accent}>
            <Text style={styles.cardTitle}>{point.name}</Text>
            <BeforeAfterSlider before={before} after={after} />
            <Text style={styles.delta}>
              Δ {after.particlesPerLiter - before.particlesPerLiter > 0 ? '+' : ''}
              {after.particlesPerLiter - before.particlesPerLiter} част./л за период
            </Text>
          </GlowCard>
        </Animated.View>

        <NeonButton label="Экспорт отчёта в PDF" onPress={exportPdf} />

        {success && (
          <Animated.View entering={FadeIn} style={styles.toast}>
            <Text style={styles.toastText}>✓ Отчёт PDF успешно сохранён в загрузки</Text>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, gap: 16, paddingBottom: 40 },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  sub: { color: colors.textMuted, fontSize: 13, marginBottom: 8 },
  compare: { marginTop: 8 },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 8 },
  delta: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 8 },
  toast: {
    backgroundColor: colors.safeDim,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.safe,
  },
  toastText: { color: colors.safe, fontWeight: '600', textAlign: 'center' },
});

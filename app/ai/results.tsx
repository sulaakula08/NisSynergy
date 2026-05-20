import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/context/AppContext';
import { ParticleDonut } from '@/components/charts/ParticleDonut';
import { GlowCard } from '@/components/ui/GlowCard';
import { RiskBadge } from '@/components/ui/RiskBadge';
import { NeonButton } from '@/components/ui/NeonButton';
import { colors, riskColor, riskLabel, spacing } from '@/constants/theme';
import { MOCK_AI_RESULT } from '@/constants/mockData';

export default function AiResultsScreen() {
  const { aiResult } = useApp();
  const r = aiResult ?? MOCK_AI_RESULT;

  return (
    <LinearGradient colors={[colors.background, colors.water + '22']} style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInDown}>
            <Text style={styles.brand}>РЕЗУЛЬТАТ ИИ</Text>
            <Text style={styles.title}>{r.pointName}</Text>
            <RiskBadge level={r.risk} />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(100)}>
            <GlowCard glowColor={colors.accent}>
              <Text style={styles.section}>Классификация частиц</Text>
              <ParticleDonut fibers={r.fibers} fragments={r.fragments} film={r.film} />
            </GlowCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200)}>
            <GlowCard glowColor={riskColor(r.risk)}>
              <Text style={styles.section}>Плотность загрязнения</Text>
              <Text style={[styles.density, { color: riskColor(r.risk) }]}>{r.particlesPerLiter}</Text>
              <Text style={styles.densityUnit}>частиц на литр</Text>
              <Text style={styles.critical}>
                {r.risk === 'high' ? 'Критический уровень' : r.risk === 'medium' ? 'Повышенный уровень' : riskLabel(r.risk)}
              </Text>
            </GlowCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300)}>
            <GlowCard glowColor={colors.purple}>
              <Text style={styles.section}>AI Prediction · Источник</Text>
              <View style={styles.confidence}>
                <Text style={styles.confValue}>{r.sourceConfidence}%</Text>
                <Text style={styles.confLabel}>уверенность модели</Text>
              </View>
              <Text style={styles.prediction}>{r.sourcePrediction}</Text>
            </GlowCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400)}>
            <GlowCard glowColor={colors.safe}>
              <Text style={styles.section}>Smart Recommendations</Text>
              {r.recommendations.map((rec, i) => (
                <View key={i} style={styles.recRow}>
                  <Text style={styles.recBullet}>▸</Text>
                  <Text style={styles.recText}>{rec}</Text>
                </View>
              ))}
            </GlowCard>
          </Animated.View>

          <NeonButton label="Готово" onPress={() => router.replace('/(volunteer)/submit')} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { padding: spacing.lg, gap: 16, paddingBottom: 40 },
  brand: { color: colors.neon, fontSize: 10, fontWeight: '800', letterSpacing: 3 },
  title: { color: colors.text, fontSize: 24, fontWeight: '800', marginVertical: 8 },
  section: { color: colors.textMuted, fontSize: 12, fontWeight: '700', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  density: { fontSize: 48, fontWeight: '800' },
  densityUnit: { color: colors.textMuted, fontSize: 14 },
  critical: { color: colors.danger, fontWeight: '700', marginTop: 8, fontSize: 14 },
  confidence: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 12 },
  confValue: { color: colors.purple, fontSize: 28, fontWeight: '800' },
  confLabel: { color: colors.textMuted, fontSize: 12 },
  prediction: { color: colors.text, fontSize: 15, lineHeight: 22 },
  recRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  recBullet: { color: colors.safe },
  recText: { flex: 1, color: colors.text, fontSize: 14, lineHeight: 20 },
});

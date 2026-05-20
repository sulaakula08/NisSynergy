import { StyleSheet, Text, View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { NeonButton } from '@/components/ui/NeonButton';
import { colors, spacing, typography } from '@/constants/theme';

const METHODS = [
  { id: 'google', label: 'Google', icon: 'google' as const, color: '#DB4437' },
  { id: 'telegram', label: 'Telegram', icon: 'telegram' as const, color: '#26A5E4' },
  { id: 'code', label: 'Быстрый код', icon: 'qrcode' as const, color: colors.neon },
];

export default function OnboardingScreen() {
  const { completeOnboarding } = useApp();

  const enter = (method: string, name: string) => {
    completeOnboarding(name, method);
    router.replace('/(volunteer)/submit');
  };

  return (
    <LinearGradient colors={[colors.background, colors.water + '44', colors.background]} style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.hero}>
          <Text style={styles.badge}>NIS ENERGY · MicroWatch</Text>
          <Text style={styles.title}>Мониторинг{'\n'}микропластика</Text>
          <Text style={styles.sub}>
            Присоединяйтесь к сети волонтёров. Одно касание — и вы отправляете пробу с AI-анализом.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.methods}>
          {METHODS.map((m) => (
            <Pressable key={m.id} style={styles.methodBtn} onPress={() => enter(m.id, `Волонтёр · ${m.label}`)}>
              <FontAwesome name={m.icon} size={22} color={m.color} />
              <Text style={styles.methodLabel}>Войти через {m.label}</Text>
              <FontAwesome name="chevron-right" size={14} color={colors.textMuted} />
            </Pressable>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)} style={styles.footer}>
          <NeonButton label="Демо без регистрации" variant="ghost" onPress={() => enter('demo', 'Гость-демо')} />
          <Pressable onPress={() => router.replace('/(ecologist)/map')}>
            <Text style={styles.ecologistLink}>Режим жюри / эколога →</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  hero: { padding: spacing.lg, paddingTop: spacing.xxl },
  badge: { color: colors.neon, fontSize: 11, fontWeight: '700', letterSpacing: 2, marginBottom: spacing.md },
  title: { ...typography.hero, color: colors.text, lineHeight: 38 },
  sub: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: spacing.md },
  methods: { paddingHorizontal: spacing.lg, gap: 12, flex: 1 },
  methodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 18,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  methodLabel: { flex: 1, color: colors.text, fontSize: 16, fontWeight: '600' },
  footer: { padding: spacing.lg, gap: 16 },
  ecologistLink: { color: colors.accent, textAlign: 'center', fontSize: 14, marginTop: 8 },
});

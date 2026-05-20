import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { RoleSwitcher } from '@/components/profile/RoleSwitcher';
import { colors, spacing } from '@/constants/theme';

export default function VolunteerProfileScreen() {
  const { userName, setRole } = useApp();

  const switchToEcologist = () => {
    setRole('ecologist');
    router.replace('/(ecologist)/map');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Профиль волонтёра</Text>
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.role}>Режим: Отправка проб · AI-анализ</Text>
      <RoleSwitcher />
      <Pressable style={styles.link} onPress={switchToEcologist}>
        <Text style={styles.linkText}>→ Режим Dashboard для жюри</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  title: { color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: 8 },
  name: { color: colors.text, fontSize: 18, fontWeight: '700' },
  role: { color: colors.textMuted, fontSize: 13, marginBottom: 24 },
  link: { marginTop: 'auto', padding: 16, backgroundColor: colors.surface, borderRadius: 12 },
  linkText: { color: colors.neon, textAlign: 'center', fontWeight: '600' },
});

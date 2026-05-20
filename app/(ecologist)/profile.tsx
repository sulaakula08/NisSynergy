import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { RoleSwitcher } from '@/components/profile/RoleSwitcher';
import { colors, spacing } from '@/constants/theme';

export default function EcologistProfileScreen() {
  const { userName, setRole } = useApp();

  const switchToVolunteer = () => {
    setRole('volunteer');
    router.replace('/onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Профиль</Text>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
      </View>
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.role}>Режим: Dashboard · Эколог / Жюри</Text>

      <RoleSwitcher />

      <Pressable style={styles.admin} onPress={switchToVolunteer}>
        <Text style={styles.adminText}>→ Перейти в режим волонтёра</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  title: { color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: 24 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.water,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: colors.white, fontSize: 28, fontWeight: '800' },
  name: { color: colors.text, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  role: { color: colors.textMuted, fontSize: 13, textAlign: 'center', marginBottom: 32 },
  admin: { marginTop: 'auto', padding: 16, backgroundColor: colors.surface, borderRadius: 12 },
  adminText: { color: colors.accent, textAlign: 'center', fontWeight: '600' },
});

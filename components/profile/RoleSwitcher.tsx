import { StyleSheet, Text, View, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useApp } from '@/context/AppContext';
import type { UserRole } from '@/types';
import { colors, radius } from '@/constants/theme';

const ROLES: { id: UserRole; label: string; icon: React.ComponentProps<typeof FontAwesome>['name']; desc: string }[] = [
  { id: 'ecologist', label: 'Dashboard', icon: 'bar-chart', desc: 'Экологи и жюри' },
  { id: 'volunteer', label: 'Волонтёр', icon: 'users', desc: 'Население и активисты' },
];

export function RoleSwitcher() {
  const { role, setRole } = useApp();

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Режим приложения</Text>
      <Text style={styles.sub}>Переключение для демо перед жюри</Text>
      <View style={styles.row}>
        {ROLES.map((r) => {
          const active = role === r.id;
          return (
            <Pressable
              key={r.id}
              style={[styles.card, active && styles.cardActive]}
              onPress={() => {
                Haptics.selectionAsync();
                setRole(r.id);
                if (r.id === 'ecologist') router.replace('/(ecologist)/map');
                else router.replace('/(volunteer)/submit');
              }}
            >
              <FontAwesome name={r.icon} size={22} color={active ? colors.neon : colors.textMuted} />
              <Text style={[styles.label, active && styles.labelActive]}>{r.label}</Text>
              <Text style={styles.desc}>{r.desc}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 24 },
  title: { color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: 4 },
  sub: { color: colors.textMuted, fontSize: 12, marginBottom: 16 },
  row: { flexDirection: 'row', gap: 12 },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  cardActive: { borderColor: colors.neon, backgroundColor: colors.safeDim },
  label: { color: colors.textMuted, fontSize: 14, fontWeight: '700' },
  labelActive: { color: colors.neon },
  desc: { color: colors.textMuted, fontSize: 10 },
});

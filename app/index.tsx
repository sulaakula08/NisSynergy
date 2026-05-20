import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { colors } from '@/constants/theme';

export default function Index() {
  const { role, isOnboarded } = useApp();

  useEffect(() => {
    const t = setTimeout(() => {
      if (role === 'volunteer' && !isOnboarded) {
        router.replace('/onboarding');
      } else if (role === 'ecologist') {
        router.replace('/(ecologist)/map');
      } else {
        router.replace('/(volunteer)/submit');
      }
    }, 400);
    return () => clearTimeout(t);
  }, [role, isOnboarded]);

  return (
    <View style={styles.splash}>
      <ActivityIndicator size="large" color={colors.neon} />
    </View>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
});

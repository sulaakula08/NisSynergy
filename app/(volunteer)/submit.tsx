import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { PollutionMap } from '@/components/map/PollutionMap';
import { NeonButton } from '@/components/ui/NeonButton';
import { GlowCard } from '@/components/ui/GlowCard';
import { useApp } from '@/context/AppContext';
import { useLocation } from '@/hooks/useLocation';
import { colors, spacing } from '@/constants/theme';

export default function SubmitSampleScreen() {
  const { setLastPhotoUri, clearAiResult } = useApp();
  const { coords } = useLocation();
  const [pointName, setPointName] = useState('Точка · Нишава');
  const [hasPhoto, setHasPhoto] = useState(false);

  const useDemoPhoto = () => {
    setLastPhotoUri('demo://water-sample');
    setHasPhoto(true);
  };

  const startAi = () => {
    if (!hasPhoto) {
      useDemoPhoto();
    }
    clearAiResult();
    router.push({ pathname: '/ai/scan', params: { pointName } });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>Новая проба</Text>
          <Text style={styles.sub}>
            Демо: {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)}
          </Text>
        </View>

        <GlowCard glowColor={colors.waterLight}>
          <Text style={styles.cardLabel}>Точка отбора (нажмите маркер)</Text>
          <PollutionMap compact onSelectPoint={(p) => setPointName(p.name)} />
          <Text style={styles.pointName}>{pointName}</Text>
        </GlowCard>

        <GlowCard glowColor={colors.neon}>
          <Text style={styles.cardLabel}>Фото пробы</Text>
          <View style={[styles.preview, hasPhoto && styles.previewReady]}>
            <FontAwesome name="tint" size={48} color={hasPhoto ? colors.neon : colors.textMuted} />
            <Text style={styles.previewText}>{hasPhoto ? 'Демо-фото готово' : 'Нажмите кнопку ниже'}</Text>
          </View>
          <NeonButton label="Подготовить демо-фото" variant="safe" onPress={useDemoPhoto} />
        </GlowCard>

        <NeonButton
          label="Запустить ИИ-анализ теста"
          onPress={startAi}
          icon={<FontAwesome name="magic" size={18} color={colors.white} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, gap: 16, paddingBottom: 40 },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  sub: { color: colors.textMuted, fontSize: 12, marginBottom: 8 },
  cardLabel: { color: colors.textMuted, fontSize: 12, marginBottom: 8, fontWeight: '600' },
  pointName: { color: colors.neon, fontSize: 13, marginTop: 8, fontWeight: '600' },
  preview: {
    height: 160,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  previewReady: { borderColor: colors.neon, backgroundColor: colors.safeDim },
  previewText: { color: colors.textMuted, marginTop: 8, fontSize: 13 },
});

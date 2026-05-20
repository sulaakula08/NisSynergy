import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ScannerOverlay } from '@/components/ai/ScannerOverlay';
import { useApp } from '@/context/AppContext';
import { colors } from '@/constants/theme';

const PHASES = [
  'Инициализация нейросети…',
  'Детекция частиц на снимке…',
  'Классификация: волокна / фрагменты…',
  'Оценка плотности загрязнения…',
  'Предсказание источника…',
  'Формирование рекомендаций…',
];

export default function AiScanScreen() {
  const { pointName } = useLocalSearchParams<{ pointName?: string }>();
  const { lastPhotoUri, runMockAiAnalysis } = useApp();
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(100, p + 2 + Math.random() * 3));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPhaseIndex(Math.min(PHASES.length - 1, Math.floor(progress / (100 / PHASES.length))));
    if (progress >= 100 && !finished.current) {
      finished.current = true;
      runMockAiAnalysis(typeof pointName === 'string' ? pointName : undefined);
      const t = setTimeout(() => router.replace('/ai/results'), 500);
      return () => clearTimeout(t);
    }
  }, [progress, pointName, runMockAiAnalysis]);

  return (
    <LinearGradient colors={[colors.background, '#0D1B2A', colors.background]} style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.top}>
          <Text style={styles.brand}>AI-VISION</Text>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.cancel}>Отмена</Text>
          </Pressable>
        </View>
        <ScannerOverlay photoUri={lastPhotoUri} progress={progress} phase={PHASES[phaseIndex]} />
        <Text style={styles.footer}>NIS Energy · Microplastic Neural Engine v2.4</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  top: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  brand: { color: colors.neon, fontWeight: '800', letterSpacing: 4, fontSize: 12 },
  cancel: { color: colors.textMuted },
  footer: { color: colors.textMuted, fontSize: 10, textAlign: 'center', paddingBottom: 24, letterSpacing: 1 },
});

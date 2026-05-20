import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '@/constants/theme';

export function PdfExportLoader({ visible }: { visible: boolean }) {
  const [barPct, setBarPct] = useState(20);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setBarPct((p) => (p >= 90 ? 25 : p + 8)), 400);
    return () => clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.title}>Генерация PDF-отчёта</Text>
          <Text style={styles.sub}>Сбор данных · Графики · Карта</Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${barPct}%` }]} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000CC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  title: { color: colors.text, fontSize: 18, fontWeight: '700' },
  sub: { color: colors.textMuted, fontSize: 12, textAlign: 'center' },
  track: {
    width: '100%',
    height: 6,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 8,
  },
  fill: { height: '100%', backgroundColor: colors.accent, borderRadius: 3 },
});

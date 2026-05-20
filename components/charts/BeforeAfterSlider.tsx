import { useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import type { SampleRecord } from '@/types';
import { colors, riskColor } from '@/constants/theme';

interface BeforeAfterSliderProps {
  before: SampleRecord;
  after: SampleRecord;
}

export function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  const [ratio, setRatio] = useState(0.5);
  const panelWidth = useRef(300);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        const w = panelWidth.current || 300;
        setRatio(Math.min(1, Math.max(0, g.moveX / w)));
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View
        style={styles.panel}
        onLayout={(e) => {
          panelWidth.current = e.nativeEvent.layout.width;
        }}
        {...panResponder.panHandlers}
      >
        <View style={[styles.half, styles.after]}>
          <Text style={styles.label}>После · {after.date}</Text>
          <Text style={[styles.value, { color: riskColor(after.risk) }]}>{after.particlesPerLiter}</Text>
          <Text style={styles.unit}>част./л</Text>
        </View>
        <View style={[styles.half, styles.before, { width: `${ratio * 100}%` }]}>
          <Text style={styles.label}>До · {before.date}</Text>
          <Text style={[styles.value, { color: riskColor(before.risk) }]}>{before.particlesPerLiter}</Text>
          <Text style={styles.unit}>част./л</Text>
        </View>
        <View style={[styles.handle, { left: `${ratio * 100}%` }]}>
          <View style={styles.handleBar} />
        </View>
      </View>
      <Text style={styles.hint}>Проведите пальцем для сравнения До / После</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  panel: {
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surfaceElevated,
    position: 'relative',
  },
  half: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'center',
  },
  before: { backgroundColor: colors.dangerDim, zIndex: 2, overflow: 'hidden' },
  after: { backgroundColor: colors.safeDim },
  label: { color: colors.textMuted, fontSize: 12, marginBottom: 4 },
  value: { fontSize: 36, fontWeight: '800' },
  unit: { color: colors.textMuted, fontSize: 12 },
  handle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 4,
    marginLeft: -2,
    zIndex: 3,
  },
  handleBar: { width: 4, height: '100%', backgroundColor: colors.accent },
  hint: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: 8 },
});

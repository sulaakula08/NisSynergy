import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/theme';

const { width } = Dimensions.get('window');
const FRAME_H = (width - 48) * 0.75;

interface ScannerOverlayProps {
  photoUri?: string | null;
  progress: number;
  phase: string;
}

export function ScannerOverlay({ progress, phase }: ScannerOverlayProps) {
  const scanY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanY, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scanY, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [scanY]);

  const translateY = scanY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, FRAME_H * 0.85],
  });

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <LinearGradient colors={[colors.water, colors.waterLight, colors.surface]} style={styles.photo} />
        <View style={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={i} style={styles.gridLine} />
          ))}
        </View>
        <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]}>
          <LinearGradient
            colors={['transparent', colors.neon, colors.accent, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.scanGradient}
          />
        </Animated.View>
      </View>
      <Text style={styles.percent}>{Math.round(progress)}%</Text>
      <Text style={styles.phase}>{phase}</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${Math.min(100, progress)}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 24 },
  frame: {
    width: width - 48,
    height: FRAME_H,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.neon + '66',
  },
  photo: { width: '100%', height: '100%' },
  grid: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    opacity: 0.3,
  },
  gridLine: { width: 1, backgroundColor: colors.neon },
  scanLine: { position: 'absolute', left: 0, right: 0, height: 3 },
  scanGradient: { height: 3, width: '100%' },
  percent: { color: colors.neon, fontSize: 48, fontWeight: '800', marginTop: 24 },
  phase: { color: colors.textMuted, fontSize: 14, marginTop: 4, marginBottom: 16 },
  barTrack: {
    width: '100%',
    height: 4,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: { height: '100%', backgroundColor: colors.neon },
});

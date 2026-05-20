import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { POLLUTION_POINTS, MAP_REGION } from '@/constants/mockData';
import { colors, riskColor } from '@/constants/theme';
import type { PollutionPoint } from '@/types';
import { RiskBadge } from '@/components/ui/RiskBadge';
import { GlowCard } from '@/components/ui/GlowCard';

interface MapFallbackProps {
  compact?: boolean;
  onSelectPoint?: (point: PollutionPoint) => void;
}

function toXY(lat: number, lng: number, w: number, h: number) {
  const latMin = MAP_REGION.latitude - MAP_REGION.latitudeDelta / 2;
  const latMax = MAP_REGION.latitude + MAP_REGION.latitudeDelta / 2;
  const lngMin = MAP_REGION.longitude - MAP_REGION.longitudeDelta / 2;
  const lngMax = MAP_REGION.longitude + MAP_REGION.longitudeDelta / 2;
  const x = ((lng - lngMin) / (lngMax - lngMin)) * w;
  const y = ((latMax - lat) / (latMax - latMin)) * h;
  return { x, y };
}

export function MapFallback({ compact, onSelectPoint }: MapFallbackProps) {
  const [selected, setSelected] = useState<PollutionPoint | null>(null);
  const mapW = compact ? 320 : 360;
  const mapH = compact ? 180 : 300;

  return (
    <View style={[styles.container, compact && styles.compact]}>
      <LinearGradient colors={['#0A1628', '#0D47A1', '#051020']} style={[styles.map, { height: mapH }]}>
        <Text style={styles.gridLabel}>NIS · DEMO MAP</Text>
        {!compact &&
          POLLUTION_POINTS.map((p) => {
            const { x, y } = toXY(p.latitude, p.longitude, mapW, mapH);
            const r = p.risk === 'high' ? 36 : p.risk === 'medium' ? 26 : 16;
            return (
              <View
                key={`heat-${p.id}`}
                style={[
                  styles.heat,
                  {
                    left: x - r,
                    top: y - r,
                    width: r * 2,
                    height: r * 2,
                    borderRadius: r,
                    backgroundColor: riskColor(p.risk) + '33',
                    borderColor: riskColor(p.risk) + '66',
                  },
                ]}
              />
            );
          })}
        {POLLUTION_POINTS.map((p) => {
          const { x, y } = toXY(p.latitude, p.longitude, mapW, mapH);
          return (
            <Pressable
              key={p.id}
              style={[styles.markerWrap, { left: x - 14, top: y - 14 }]}
              onPress={() => {
                setSelected(p);
                onSelectPoint?.(p);
              }}
            >
              <View style={[styles.marker, { borderColor: riskColor(p.risk), backgroundColor: riskColor(p.risk) }]}>
                <View style={styles.markerCore} />
              </View>
            </Pressable>
          );
        })}
      </LinearGradient>
      {selected && !compact && (
        <View style={styles.cardOverlay}>
          <GlowCard glowColor={riskColor(selected.risk)}>
            <Text style={styles.pointName}>{selected.name}</Text>
            <RiskBadge level={selected.risk} />
            <Text style={styles.meta}>{selected.particlesPerLiter} част./л</Text>
          </GlowCard>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, borderRadius: 16, overflow: 'hidden' },
  compact: { flex: undefined },
  map: { width: '100%', borderRadius: 16, overflow: 'hidden', position: 'relative' },
  gridLabel: {
    position: 'absolute',
    top: 8,
    left: 10,
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
  },
  heat: { position: 'absolute', borderWidth: 1 },
  markerWrap: { position: 'absolute', width: 28, height: 28 },
  marker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerCore: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.white },
  cardOverlay: { position: 'absolute', bottom: 12, left: 12, right: 12 },
  pointName: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 8 },
  meta: { color: colors.textMuted, fontSize: 12, marginTop: 8 },
});

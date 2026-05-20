import { MapFallback } from '@/components/map/MapFallback';
import type { PollutionPoint } from '@/types';

interface PollutionMapProps {
  compact?: boolean;
  userCoords?: { latitude: number; longitude: number };
  onSelectPoint?: (point: PollutionPoint) => void;
}

/** Стабильная демо-карта без Google Maps API и нативных модулей */
export function PollutionMap({ compact, onSelectPoint }: PollutionMapProps) {
  return <MapFallback compact={compact} onSelectPoint={onSelectPoint} />;
}

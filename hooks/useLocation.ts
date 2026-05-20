import { MAP_REGION } from '@/constants/mockData';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/** Демо-координаты без GPS и разрешений */
export function useLocation() {
  return {
    coords: {
      latitude: MAP_REGION.latitude,
      longitude: MAP_REGION.longitude,
    },
    loading: false,
    error: null as string | null,
  };
}

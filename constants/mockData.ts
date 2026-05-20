import type { PollutionPoint, AiAnalysisResult } from '@/types';

// Ниш (Сербия) — демо-координаты для карты
export const MAP_REGION = {
  latitude: 43.3209,
  longitude: 21.8958,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export const POLLUTION_POINTS: PollutionPoint[] = [
  {
    id: 'p1',
    name: 'Нишава · Центр',
    latitude: 43.3189,
    longitude: 21.896,
    risk: 'high',
    particlesPerLiter: 48,
    lastSampleDate: '2026-05-12',
    history: [
      { id: 's1', date: '2025-11-10', particlesPerLiter: 62, risk: 'high', fibers: 50, fragments: 35, film: 15 },
      { id: 's2', date: '2026-02-14', particlesPerLiter: 55, risk: 'high', fibers: 48, fragments: 37, film: 15 },
      { id: 's3', date: '2026-05-12', particlesPerLiter: 48, risk: 'high', fibers: 45, fragments: 40, film: 15 },
    ],
  },
  {
    id: 'p2',
    name: 'Кала-draga · Скважина №7',
    latitude: 43.325,
    longitude: 21.882,
    risk: 'medium',
    particlesPerLiter: 18,
    lastSampleDate: '2026-05-08',
    history: [
      { id: 's4', date: '2025-10-01', particlesPerLiter: 28, risk: 'medium', fibers: 40, fragments: 45, film: 15 },
      { id: 's5', date: '2026-05-08', particlesPerLiter: 18, risk: 'medium', fibers: 42, fragments: 43, film: 15 },
    ],
  },
  {
    id: 'p3',
    name: 'Медиана · Парк',
    latitude: 43.312,
    longitude: 21.91,
    risk: 'safe',
    particlesPerLiter: 4,
    lastSampleDate: '2026-05-15',
    history: [
      { id: 's6', date: '2026-01-20', particlesPerLiter: 8, risk: 'safe', fibers: 35, fragments: 50, film: 15 },
      { id: 's7', date: '2026-05-15', particlesPerLiter: 4, risk: 'safe', fibers: 30, fragments: 55, film: 15 },
    ],
  },
  {
    id: 'p4',
    name: 'Пантелеймон · Ручей',
    latitude: 43.335,
    longitude: 21.905,
    risk: 'high',
    particlesPerLiter: 32,
    lastSampleDate: '2026-04-28',
    history: [
      { id: 's8', date: '2025-12-05', particlesPerLiter: 41, risk: 'high', fibers: 55, fragments: 30, film: 15 },
      { id: 's9', date: '2026-04-28', particlesPerLiter: 32, risk: 'high', fibers: 45, fragments: 40, film: 15 },
    ],
  },
  {
    id: 'p5',
    name: 'Црвени Крст · Ливневка',
    latitude: 43.308,
    longitude: 21.888,
    risk: 'medium',
    particlesPerLiter: 14,
    lastSampleDate: '2026-05-01',
    history: [
      { id: 's10', date: '2026-03-10', particlesPerLiter: 22, risk: 'medium', fibers: 38, fragments: 47, film: 15 },
      { id: 's11', date: '2026-05-01', particlesPerLiter: 14, risk: 'medium', fibers: 40, fragments: 45, film: 15 },
    ],
  },
];

export const MOCK_AI_RESULT: AiAnalysisResult = {
  fibers: 45,
  fragments: 40,
  film: 15,
  particlesPerLiter: 32,
  risk: 'high',
  sourcePrediction:
    'С вероятностью 84% источником загрязнения являются сточные воды текстильного предприятия, расположенного выше по течению.',
  sourceConfidence: 84,
  recommendations: [
    'Категорически не использовать эту скважину без систем обратного осмоса.',
    'Проверить соседнюю ливневую точку в радиусе 500 м.',
    'Сообщить в экологический штаб о повторном превышении нормы.',
    'Повторить пробу через 7 дней после дождя.',
  ],
  pointName: 'Текущая точка',
};

import { UtilityCategory, Language } from '@/types';

export interface UtilityCategoryMeta {
  id: UtilityCategory;
  nameUk: string;
  nameEn: string;
  namePl: string;
  nameRu: string;
  nameSv: string;
  nameRo: string;
  icon: string;
  color: string;
  defaultUnit: string;
  defaultTariff: number; // типовий тариф у грн
  hasMeterDefault: boolean;
}

export const UTILITY_CATEGORIES: Record<UtilityCategory, UtilityCategoryMeta> = {
  electricity: {
    id: 'electricity',
    nameUk: 'Електроенергія (Світло)',
    nameEn: 'Electricity',
    namePl: 'Prąd elektryczny',
    nameRu: 'Электроэнергия (Свет)',
    nameSv: 'Elektricitet (El)',
    nameRo: 'Electricitate (Curent)',
    icon: '⚡',
    color: '#f59e0b',
    defaultUnit: 'кВт·год',
    defaultTariff: 4.32,
    hasMeterDefault: true
  },
  cold_water: {
    id: 'cold_water',
    nameUk: 'Холодна вода & водовідведення',
    nameEn: 'Cold Water',
    namePl: 'Zimna woda',
    nameRu: 'Холодная вода и водоотведение',
    nameSv: 'Kallvatten & avlopp',
    nameRo: 'Apă rece & canalizare',
    icon: '💧',
    color: '#3b82f6',
    defaultUnit: 'м³',
    defaultTariff: 30.38,
    hasMeterDefault: true
  },
  hot_water: {
    id: 'hot_water',
    nameUk: 'Гаряча вода',
    nameEn: 'Hot Water',
    namePl: 'Ciepła woda',
    nameRu: 'Горячая вода',
    nameSv: 'Varmvatten',
    nameRo: 'Apă caldă',
    icon: '♨️',
    color: '#ef4444',
    defaultUnit: 'м³',
    defaultTariff: 97.89,
    hasMeterDefault: true
  },
  gas: {
    id: 'gas',
    nameUk: 'Газопостачання (Газ)',
    nameEn: 'Natural Gas',
    namePl: 'Gaz ziemny',
    nameRu: 'Газоснабжение (Газ)',
    nameSv: 'Naturgas',
    nameRo: 'Gaze naturale',
    icon: '🔥',
    color: '#f97316',
    defaultUnit: 'м³',
    defaultTariff: 7.96,
    hasMeterDefault: true
  },
  gas_distribution: {
    id: 'gas_distribution',
    nameUk: 'Розподіл газу (Доставка)',
    nameEn: 'Gas Distribution',
    namePl: 'Dystrybucja gazu',
    nameRu: 'Распределение газа (Доставка)',
    nameSv: 'Gasdistribution',
    nameRo: 'Distribuție gaze',
    icon: '🚚',
    color: '#ea580c',
    defaultUnit: 'м³',
    defaultTariff: 1.79,
    hasMeterDefault: false
  },
  heating: {
    id: 'heating',
    nameUk: 'Центральне опалення',
    nameEn: 'Heating',
    namePl: 'Ogrzewanie',
    nameRu: 'Отопление',
    nameSv: 'Fjärrvärme',
    nameRo: 'Încălzire centrală',
    icon: '🌡️',
    color: '#ec4899',
    defaultUnit: 'Гкал',
    defaultTariff: 1654.41,
    hasMeterDefault: false
  },
  osbb: {
    id: 'osbb',
    nameUk: 'Квартплата / ОСББ',
    nameEn: 'HOA / Maintenance',
    namePl: 'Czynsz / Wspólnota',
    nameRu: 'Квартплата / ОСМД',
    nameSv: 'Hyra / Samfällighet',
    nameRo: 'Întreținere / Asociație',
    icon: '🏢',
    color: '#8b5cf6',
    defaultUnit: 'міс',
    defaultTariff: 480,
    hasMeterDefault: false
  },
  trash: {
    id: 'trash',
    nameUk: 'Вивіз твердих побутових відходів',
    nameEn: 'Waste Management',
    namePl: 'Wywóz śmieci',
    nameRu: 'Вывоз мусора',
    nameSv: 'Sophämtning',
    nameRo: 'Salubrizare / Gunoi',
    icon: '🗑️',
    color: '#10b981',
    defaultUnit: 'міс',
    defaultTariff: 45,
    hasMeterDefault: false
  },
  internet: {
    id: 'internet',
    nameUk: 'Інтернет та Телебачення',
    nameEn: 'Internet & TV',
    namePl: 'Internet i TV',
    nameRu: 'Интернет и ТВ',
    nameSv: 'Bredband & TV',
    nameRo: 'Internet și TV',
    icon: '🌐',
    color: '#06b6d4',
    defaultUnit: 'міс',
    defaultTariff: 300,
    hasMeterDefault: false
  },
  other: {
    id: 'other',
    nameUk: 'Інша послуга',
    nameEn: 'Other Service',
    namePl: 'Inna usługa',
    nameRu: 'Другая услуга',
    nameSv: 'Annan tjänst',
    nameRo: 'Alt serviciu',
    icon: '🧾',
    color: '#9ca3af',
    defaultUnit: 'послуга',
    defaultTariff: 0,
    hasMeterDefault: false
  }
};

export function getUtilityCategoryName(cat: UtilityCategoryMeta, lang: Language): string {
  switch (lang) {
    case 'en': return cat.nameEn;
    case 'pl': return cat.namePl;
    case 'ru': return cat.nameRu;
    case 'sv': return cat.nameSv;
    case 'ro': return cat.nameRo;
    case 'uk':
    default:
      return cat.nameUk;
  }
}

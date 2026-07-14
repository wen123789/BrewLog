import { create } from 'zustand';
import type { CoffeeBean, Equipment, EquipmentSet, BrewRecord, BrewRecommendation } from '@/types';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '@/utils/storage';
import { generateId } from '@/utils/recommendation';

interface AppState {
  beans: CoffeeBean[];
  equipment: Equipment[];
  equipmentSets: EquipmentSet[];
  records: BrewRecord[];
  recommendation: BrewRecommendation | null;
  selectedBean: CoffeeBean | null;
  selectedEquipment: Equipment | null;
  
  addBean: (bean: Omit<CoffeeBean, 'id' | 'createdAt'>) => void;
  removeBean: (id: string) => void;
  updateBean: (id: string, updates: Partial<CoffeeBean>) => void;
  
  addEquipment: (equipment: Omit<Equipment, 'id' | 'createdAt'>) => void;
  removeEquipment: (id: string) => void;
  
  addEquipmentSet: (set: Omit<EquipmentSet, 'id' | 'createdAt'>) => void;
  removeEquipmentSet: (id: string) => void;
  
  addRecord: (record: Omit<BrewRecord, 'id' | 'createdAt'>) => void;
  removeRecord: (id: string) => void;
  
  setRecommendation: (recommendation: BrewRecommendation | null) => void;
  setSelectedBean: (bean: CoffeeBean | null) => void;
  setSelectedEquipment: (equipment: Equipment | null) => void;
  
  clearAll: () => void;
}

const initialBeans = loadFromStorage<CoffeeBean[]>(STORAGE_KEYS.BEANS, []);

// 兼容旧格式：将 type 字符串迁移为 types 数组
const rawEquipment = loadFromStorage<any[]>(STORAGE_KEYS.EQUIPMENT, []);
const initialEquipment: Equipment[] = rawEquipment.map((e) => {
  if (e.type && !e.types) {
    return { ...e, types: [e.type], category: e.category || 'core' };
  }
  return { ...e, category: e.category || 'core' };
});

const initialEquipmentSets = loadFromStorage<EquipmentSet[]>(STORAGE_KEYS.EQUIPMENT_SETS, []);
const initialRecords = loadFromStorage<BrewRecord[]>(STORAGE_KEYS.RECORDS, []);

export const useAppStore = create<AppState>((set) => ({
  beans: initialBeans,
  equipment: initialEquipment,
  equipmentSets: initialEquipmentSets,
  records: initialRecords,
  recommendation: null,
  selectedBean: null,
  selectedEquipment: null,

  addBean: (bean) => {
    const newBean: CoffeeBean = {
      ...bean,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    set((state) => {
      const beans = [...state.beans, newBean];
      saveToStorage(STORAGE_KEYS.BEANS, beans);
      return { beans };
    });
  },

  removeBean: (id) => {
    set((state) => {
      const beans = state.beans.filter((b) => b.id !== id);
      saveToStorage(STORAGE_KEYS.BEANS, beans);
      return { beans };
    });
  },

  updateBean: (id, updates) => {
    set((state) => {
      const beans = state.beans.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      );
      saveToStorage(STORAGE_KEYS.BEANS, beans);
      return { beans };
    });
  },

  addEquipment: (equipment) => {
    const newEquipment: Equipment = {
      ...equipment,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    set((state) => {
      const equipmentList = [...state.equipment, newEquipment];
      saveToStorage(STORAGE_KEYS.EQUIPMENT, equipmentList);
      return { equipment: equipmentList };
    });
  },

  removeEquipment: (id) => {
    set((state) => {
      const equipment = state.equipment.filter((e) => e.id !== id);
      saveToStorage(STORAGE_KEYS.EQUIPMENT, equipment);
      return { equipment };
    });
  },

  addEquipmentSet: (equipmentSet) => {
    const newSet: EquipmentSet = {
      ...equipmentSet,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    set((state) => {
      const equipmentSets = [...state.equipmentSets, newSet];
      saveToStorage(STORAGE_KEYS.EQUIPMENT_SETS, equipmentSets);
      return { equipmentSets };
    });
  },

  removeEquipmentSet: (id) => {
    set((state) => {
      const equipmentSets = state.equipmentSets.filter((s) => s.id !== id);
      saveToStorage(STORAGE_KEYS.EQUIPMENT_SETS, equipmentSets);
      return { equipmentSets };
    });
  },

  addRecord: (record) => {
    const newRecord: BrewRecord = {
      ...record,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    set((state) => {
      const records = [...state.records, newRecord];
      saveToStorage(STORAGE_KEYS.RECORDS, records);
      return { records };
    });
  },

  removeRecord: (id) => {
    set((state) => {
      const records = state.records.filter((r) => r.id !== id);
      saveToStorage(STORAGE_KEYS.RECORDS, records);
      return { records };
    });
  },

  setRecommendation: (recommendation) => {
    set({ recommendation });
  },

  setSelectedBean: (bean) => {
    set({ selectedBean: bean });
  },

  setSelectedEquipment: (equipment) => {
    set({ selectedEquipment: equipment });
  },

  clearAll: () => {
    set({
      beans: [],
      equipment: [],
      equipmentSets: [],
      records: [],
      recommendation: null,
      selectedBean: null,
      selectedEquipment: null,
    });
    localStorage.clear();
  },
}));
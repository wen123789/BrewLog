import { useState } from 'react';
import { Plus, Trash2, Package, Layers, Cpu, Leaf, Wrench } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { useAppStore } from '@/store';
import type { Equipment, EquipmentSet, EquipmentType } from '@/types';

// 设备类型配置
const equipmentTypes: Record<EquipmentType, { label: string; icon: string; category: 'core' | 'consumable' | 'accessory' }> = {
  grinder: { label: '磨豆机', icon: '⚙️', category: 'core' },
  kettle: { label: '手冲壶', icon: '🫖', category: 'core' },
  dripper: { label: '滤杯', icon: '☕', category: 'core' },
  scale: { label: '电子秤', icon: '⚖️', category: 'core' },
  server: { label: '分享壶', icon: '🫙', category: 'core' },
  filter: { label: '滤纸/滤网', icon: '📄', category: 'consumable' },
  accessory: { label: '配件', icon: '🔧', category: 'accessory' },
  other: { label: '其他', icon: '📦', category: 'core' },
};

// 分类配置
const categories = {
  core: { label: '核心设备', icon: Cpu, color: 'from-coffee-600 to-coffee-700' },
  consumable: { label: '耗材', icon: Leaf, color: 'from-forest-600 to-forest-700' },
  accessory: { label: '配件', icon: Wrench, color: 'from-cream-500 to-cream-600' },
};

// 根据名称智能推荐类型
const smartTypeDetection = (name: string): EquipmentType[] => {
  const result: EquipmentType[] = [];
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('磨豆') || lowerName.includes('grinder') || lowerName.includes('c40') || lowerName.includes('k4') || lowerName.includes('ek43')) {
    result.push('grinder');
  }
  if (lowerName.includes('壶') || lowerName.includes('kettle') || lowerName.includes('stagg') || lowerName.includes('gooseneck')) {
    result.push('kettle');
  }
  if (lowerName.includes('滤杯') || lowerName.includes('dripper') || lowerName.includes('v60') || lowerName.includes('kalita') || lowerName.includes('origami')) {
    result.push('dripper');
  }
  if (lowerName.includes('秤') || lowerName.includes('scale') || lowerName.includes('acaia') || lowerName.includes('pearl')) {
    result.push('scale');
  }
  if (lowerName.includes('分享') || lowerName.includes('server') || lowerName.includes('下壶')) {
    result.push('server');
  }
  if (lowerName.includes('滤纸') || lowerName.includes('filter') || lowerName.includes('滤网')) {
    result.push('filter');
  }
  
  return result.length > 0 ? result : [];
};

export function EquipmentPage() {
  const { equipment, equipmentSets, addEquipment, removeEquipment, addEquipmentSet, removeEquipmentSet } = useAppStore();
  const [activeTab, setActiveTab] = useState<'equipment' | 'sets'>('equipment');
  const [selectedCategory, setSelectedCategory] = useState<'core' | 'consumable' | 'accessory' | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSetModalOpen, setIsSetModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    types: [] as EquipmentType[],
    category: 'core' as 'core' | 'consumable' | 'accessory',
    brand: '',
  });
  const [newSetData, setNewSetData] = useState({
    name: '',
    equipmentIds: [] as string[],
  });

  const handleEquipmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addEquipment({
      name: formData.name,
      types: formData.types.length > 0 ? formData.types : ['other'],
      category: formData.category,
      brand: formData.brand,
    });

    setFormData({ name: '', types: [], category: 'core', brand: '' });
    setIsModalOpen(false);
  };

  const handleNameChange = (value: string) => {
    const detectedTypes = smartTypeDetection(value);
    setFormData({
      ...formData,
      name: value,
      types: detectedTypes.length > 0 ? detectedTypes : formData.types,
      category: detectedTypes.some(t => equipmentTypes[t].category === 'consumable') ? 'consumable' :
               detectedTypes.some(t => equipmentTypes[t].category === 'accessory') ? 'accessory' : formData.category,
    });
  };

  const toggleType = (type: EquipmentType) => {
    setFormData((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const handleSetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSetData.name.trim() || newSetData.equipmentIds.length === 0) return;

    addEquipmentSet({
      name: newSetData.name,
      equipmentIds: newSetData.equipmentIds,
    });

    setNewSetData({ name: '', equipmentIds: [] });
    setIsSetModalOpen(false);
  };

  const toggleEquipmentInSet = (id: string) => {
    setNewSetData((prev) => ({
      ...prev,
      equipmentIds: prev.equipmentIds.includes(id)
        ? prev.equipmentIds.filter((eid) => eid !== id)
        : [...prev.equipmentIds, id],
    }));
  };

  const groupedByCategory = equipment.reduce((acc, item) => {
    const cat = item.category || 'core';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, Equipment[]>);

  const filteredEquipment = selectedCategory === 'all' 
    ? equipment 
    : equipment.filter((e) => (e.category || 'core') === selectedCategory);

  const getEquipmentNames = (ids: string[]) => {
    return ids.map((id) => equipment.find((e) => e.id === id)?.name).filter(Boolean);
  };

  const getTypeIcons = (types: EquipmentType[]) => {
    return types.slice(0, 3).map((t) => equipmentTypes[t]?.icon).filter(Boolean);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-coffee-900">设备档案</h1>
            <p className="text-coffee-600 mt-1">管理你的冲煮器具和耗材</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('equipment')}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'equipment'
                ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
            }`}
          >
            <Package className="w-5 h-5" />
            设备管理
          </button>
          <button
            onClick={() => setActiveTab('sets')}
            className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === 'sets'
                ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
            }`}
          >
            <Layers className="w-5 h-5" />
            设备套装
          </button>
        </div>

        {activeTab === 'equipment' && (
          <>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-coffee-700 text-white'
                    : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'
                }`}
              >
                全部 ({equipment.length})
              </button>
              {Object.entries(categories).map(([key, { label, icon: Icon }]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as 'core' | 'consumable' | 'accessory')}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === key
                      ? 'bg-coffee-700 text-white'
                      : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label} ({groupedByCategory[key]?.length || 0})
                </button>
              ))}
            </div>

            <div className="flex justify-end mb-4">
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="w-5 h-5 mr-2" />
                添加设备
              </Button>
            </div>

            {equipment.length === 0 ? (
              <Card className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center text-4xl">
                  ⚙️
                </div>
                <h3 className="font-bold text-coffee-900 mb-2">还没有设备</h3>
                <p className="text-coffee-600 mb-4">添加你的冲煮器具</p>
                <Button onClick={() => setIsModalOpen(true)}>
                  <Plus className="w-5 h-5 mr-2" />
                  添加设备
                </Button>
              </Card>
            ) : (
              <div className="space-y-6">
                {Object.entries(categories).map(([catKey, { label: catLabel, icon: CatIcon, color }]) => {
                  const catItems = filteredEquipment.filter((e) => (e.category || 'core') === catKey);
                  if (catItems.length === 0) return null;
                  if (selectedCategory !== 'all' && selectedCategory !== catKey) return null;

                  return (
                    <div key={catKey}>
                      <h2 className="text-lg font-bold text-coffee-900 mb-3 flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
                          <CatIcon className="w-4 h-4" />
                        </div>
                        {catLabel}
                        <span className="text-sm text-coffee-500 font-normal">({catItems.length})</span>
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {catItems.map((item) => (
                          <Card key={item.id} className="relative group">
                            <button
                              onClick={() => removeEquipment(item.id)}
                              className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center">
                                <span className="text-2xl">{getTypeIcons(item.types).join(' ') || '📦'}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-coffee-900 truncate">{item.name}</h3>
                                <div className="flex flex-wrap items-center gap-1.5 text-sm">
                                  {item.types.map((type) => (
                                    <span key={type} className="px-2 py-0.5 bg-coffee-100 text-coffee-700 rounded text-xs">
                                      {equipmentTypes[type]?.label}
                                    </span>
                                  ))}
                                  {item.brand && <span className="text-coffee-600 truncate">· {item.brand}</span>}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === 'sets' && (
          <>
            <div className="flex justify-end mb-4">
              <Button onClick={() => setIsSetModalOpen(true)} disabled={equipment.length === 0}>
                <Plus className="w-5 h-5 mr-2" />
                创建套装
              </Button>
            </div>

            {equipment.length === 0 ? (
              <Card className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center text-4xl">
                  📦
                </div>
                <h3 className="font-bold text-coffee-900 mb-2">请先添加设备</h3>
                <p className="text-coffee-600">添加设备后才能创建套装</p>
              </Card>
            ) : equipmentSets.length === 0 ? (
              <Card className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center text-4xl">
                  <Layers className="w-10 h-10 text-coffee-600" />
                </div>
                <h3 className="font-bold text-coffee-900 mb-2">还没有套装</h3>
                <p className="text-coffee-600 mb-4">创建你的冲煮套装，方便快速选择</p>
                <Button onClick={() => setIsSetModalOpen(true)}>
                  <Plus className="w-5 h-5 mr-2" />
                  创建套装
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipmentSets.map((set) => (
                  <Card key={set.id} className="relative group">
                    <button
                      onClick={() => removeEquipmentSet(set.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-coffee-600 to-coffee-700 flex items-center justify-center text-white">
                        <Layers className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-coffee-900 mb-2">{set.name}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {getEquipmentNames(set.equipmentIds).map((name) => (
                            <span
                              key={name}
                              className="px-2 py-1 text-xs bg-coffee-100 text-coffee-700 rounded"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="添加设备">
          <form onSubmit={handleEquipmentSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-1">
                设备名称 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                placeholder="例如：Comandante C40"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                设备分类
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(categories).map(([key, { label, icon: Icon }]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: key as 'core' | 'consumable' | 'accessory' })}
                    className={`px-3 py-3 rounded-lg font-medium transition-all flex flex-col items-center gap-1 ${
                      formData.category === key
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                        : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                类型标签 (可多选，选填)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(equipmentTypes)
                  .filter(([, config]) => config.category === formData.category)
                  .map(([type, { label, icon }]) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleType(type as EquipmentType)}
                      className={`px-3 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 ${
                        formData.types.includes(type as EquipmentType)
                          ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                          : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                      }`}
                    >
                      <span className="text-lg">{icon}</span>
                      <span className="text-sm">{label}</span>
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-1">品牌</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                placeholder="例如：Comandante"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => setIsModalOpen(false)}
              >
                取消
              </Button>
              <Button type="submit" className="flex-1">
                保存
              </Button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isSetModalOpen} onClose={() => setIsSetModalOpen(false)} title="创建设备套装">
          <form onSubmit={handleSetSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-1">
                套装名称 *
              </label>
              <input
                type="text"
                value={newSetData.name}
                onChange={(e) => setNewSetData({ ...newSetData, name: e.target.value })}
                className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                placeholder="例如：我的日常套装"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                选择设备 * (已选 {newSetData.equipmentIds.length} 个)
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {equipment.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleEquipmentInSet(item.id)}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                      newSetData.equipmentIds.includes(item.id)
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white'
                        : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                    }`}
                  >
                    <span className="text-xl">{getTypeIcons(item.types).join(' ') || '📦'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.name}</div>
                      <div className={`text-xs flex flex-wrap gap-1 ${newSetData.equipmentIds.includes(item.id) ? 'text-coffee-200' : 'text-coffee-500'}`}>
                        {item.types.map((type) => (
                          <span key={type}>{equipmentTypes[type]?.label}</span>
                        ))}
                        {item.brand && <span>· {item.brand}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => setIsSetModalOpen(false)}
              >
                取消
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={newSetData.equipmentIds.length === 0}
              >
                创建套装
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
}
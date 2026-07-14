import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Thermometer, Droplets, Scale, Clock, Star, Tag } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { StarRating } from '@/components/common/StarRating';
import { useAppStore } from '@/store';
import type { BrewRecord } from '@/types';

const grindSizeOptions = ['极细', '细', '中细', '中', '中粗', '粗', '极粗'];
const flavorOptions = ['果酸', '花香', '柑橘', '坚果', '巧克力', '焦糖', '可可', '香料', '莓果', '草本'];

export function NewRecordPage() {
  const navigate = useNavigate();
  const { beans, equipment, equipmentSets, addRecord, recommendation } = useAppStore();

  const [formData, setFormData] = useState({
    beanId: beans[0]?.id || '',
    beanName: beans[0]?.name || '',
    equipmentName: '',
    waterTemp: recommendation?.waterTemp || 92,
    grindSize: recommendation?.grindSize || '中',
    waterAmount: recommendation?.waterAmount || 240,
    coffeeAmount: recommendation?.coffeeAmount || 15,
    totalTime: 0,
    rating: 3,
    flavorNotes: [] as string[],
    notes: '',
  });
  const [beanInputMode, setBeanInputMode] = useState<'select' | 'custom'>('select');
  const [equipmentInputMode, setEquipmentInputMode] = useState<'set' | 'single' | 'custom'>('set');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.beanName.trim()) {
      alert('请输入或选择咖啡豆');
      return;
    }

    addRecord(formData);
    navigate('/records');
  };

  const toggleFlavorTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      flavorNotes: prev.flavorNotes.includes(tag)
        ? prev.flavorNotes.filter((t) => t !== tag)
        : [...prev.flavorNotes, tag],
    }));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-coffee-900">添加冲煮记录</h1>
            <p className="text-coffee-600 mt-1">记录你的冲煮参数和感受</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/records')}>
            返回列表
          </Button>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-2">
                  咖啡豆 *
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBeanInputMode('select');
                      if (beans[0]) {
                        setFormData((prev) => ({
                          ...prev,
                          beanId: beans[0].id,
                          beanName: beans[0].name,
                        }));
                      }
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      beanInputMode === 'select'
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                        : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                    }`}
                  >
                    选择豆袋
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBeanInputMode('custom');
                      setFormData((prev) => ({ ...prev, beanId: '' }));
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      beanInputMode === 'custom'
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                        : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                    }`}
                  >
                    手动输入
                  </button>
                </div>
                {beanInputMode === 'select' ? (
                  <select
                    value={formData.beanId}
                    onChange={(e) => {
                      const selectedBean = beans.find((b) => b.id === e.target.value);
                      setFormData({
                        ...formData,
                        beanId: e.target.value,
                        beanName: selectedBean?.name || '',
                      });
                    }}
                    className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  >
                    <option value="">请选择咖啡豆</option>
                    {beans.map((bean) => (
                      <option key={bean.id} value={bean.id}>
                        {bean.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData.beanName}
                    onChange={(e) => setFormData({ ...formData, beanName: e.target.value })}
                    className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                    placeholder="例如：耶加雪菲 水洗"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-2">
                  使用设备
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEquipmentInputMode('set');
                      setFormData((prev) => ({ ...prev, equipmentName: '' }));
                    }}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                      equipmentInputMode === 'set'
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                        : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                    }`}
                  >
                    选择套装
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEquipmentInputMode('single');
                      setFormData((prev) => ({ ...prev, equipmentName: '' }));
                    }}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                      equipmentInputMode === 'single'
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                        : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                    }`}
                  >
                    单个设备
                  </button>
                  <button
                    type="button"
                    onClick={() => setEquipmentInputMode('custom')}
                    className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                      equipmentInputMode === 'custom'
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                        : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                    }`}
                  >
                    手动输入
                  </button>
                </div>

                {equipmentInputMode === 'set' && (
                  <select
                    value={formData.equipmentName}
                    onChange={(e) => {
                      const selectedSet = equipmentSets.find((s) => s.name === e.target.value);
                      if (selectedSet) {
                        // 将套装中的设备名称合并显示
                        const names = selectedSet.equipmentIds
                          .map((id) => equipment.find((eq) => eq.id === id)?.name)
                          .filter(Boolean)
                          .join('、');
                        setFormData({ ...formData, equipmentName: names });
                      }
                    }}
                    className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  >
                    <option value="">请选择套装</option>
                    {equipmentSets.map((set) => (
                      <option key={set.id} value={set.name}>
                        {set.name}
                      </option>
                    ))}
                  </select>
                )}

                {equipmentInputMode === 'single' && (
                  <select
                    value={formData.equipmentName}
                    onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
                    className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  >
                    <option value="">请选择设备</option>
                    {equipment.map((eq) => (
                      <option key={eq.id} value={eq.name}>
                        {eq.name}
                      </option>
                    ))}
                  </select>
                )}

                {equipmentInputMode === 'custom' && (
                  <input
                    type="text"
                    value={formData.equipmentName}
                    onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
                    className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                    placeholder="例如：Hario V60"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-1">
                  <Thermometer className="w-4 h-4 inline mr-1" />
                  水温 (℃)
                </label>
                <input
                  type="number"
                  min="80"
                  max="100"
                  value={formData.waterTemp}
                  onChange={(e) => setFormData({ ...formData, waterTemp: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-1">
                  <Scale className="w-4 h-4 inline mr-1" />
                  粉量 (g)
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={formData.coffeeAmount}
                  onChange={(e) => setFormData({ ...formData, coffeeAmount: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-1">
                  <Droplets className="w-4 h-4 inline mr-1" />
                  水量 (ml)
                </label>
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={formData.waterAmount}
                  onChange={(e) => setFormData({ ...formData, waterAmount: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-900 mb-1">
                  <Clock className="w-4 h-4 inline mr-1" />
                  总时长 (秒)
                </label>
                <input
                  type="number"
                  min="0"
                  max="600"
                  value={formData.totalTime}
                  onChange={(e) => setFormData({ ...formData, totalTime: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">研磨度</label>
              <div className="flex flex-wrap gap-2">
                {grindSizeOptions.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setFormData({ ...formData, grindSize: size })}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      formData.grindSize === size
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                        : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                <Star className="w-4 h-4 inline mr-1" />
                评分
              </label>
              <StarRating
                rating={formData.rating}
                onChange={(rating) => setFormData({ ...formData, rating })}
                size="lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                风味标签
              </label>
              <div className="flex flex-wrap gap-2">
                {flavorOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleFlavorTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      formData.flavorNotes.includes(tag)
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                        : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">备注</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent resize-none"
                placeholder="记录你的冲煮感受..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="secondary" className="flex-1" onClick={() => navigate('/records')}>
                取消
              </Button>
              <Button type="submit" className="flex-1">
                <Plus className="w-5 h-5 mr-2" />
                保存记录
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
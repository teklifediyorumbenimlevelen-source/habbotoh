import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Calculator, Copy } from 'lucide-react';
import { ranks, badgeNames } from '../../data/promotionData';
import { calculatePromotion } from '../../utils/promotionCalculator';
import toast from 'react-hot-toast';

export function PromotionForm() {
  const [formData, setFormData] = useState({
    userName: '',
    workTime: '',
    badge: '',
    rank: ''
  });
  
  const [result, setResult] = useState<any>(null);

  const handleBadgeChange = (badge: string) => {
    setFormData(prev => ({ 
      ...prev, 
      badge,
      rank: '' // Reset rank when badge changes
    }));
  };

  const handleCalculate = () => {
    if (!formData.userName || !formData.workTime || !formData.badge || !formData.rank) {
      toast.error('Lütfen tüm alanları doldurun!');
      return;
    }

    const calculationResult = calculatePromotion({
      userName: formData.userName,
      workTime: parseInt(formData.workTime),
      badge: formData.badge,
      rank: formData.rank
    });

    setResult(calculationResult);
    
    if (calculationResult.success) {
      toast.success('Terfi hesaplaması başarılı!');
    } else {
      toast.error('Terfi için gerekli şartlar sağlanmadı!');
    }
  };

  const copyResult = () => {
    if (result?.message) {
      navigator.clipboard.writeText(result.message);
      toast.success('Sonuç panoya kopyalandı!');
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Calculator className="w-6 h-6 mr-2 text-red-500" />
        Terfi Yönetimi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input
          label="İsim"
          placeholder="Kullanıcı adını girin"
          value={formData.userName}
          onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
          fullWidth
        />

        <Input
          label="Çalışma Süresi (dakika)"
          type="number"
          placeholder="Çalışma süresini girin"
          value={formData.workTime}
          onChange={(e) => setFormData(prev => ({ ...prev, workTime: e.target.value }))}
          fullWidth
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Rozet Seçimi
          </label>
          <select
            value={formData.badge}
            onChange={(e) => handleBadgeChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500/20 focus:outline-none focus:ring-2"
          >
            <option value="">Rozet seçin</option>
            {Object.entries(badgeNames).map(([key, name]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Rütbe Seçimi
          </label>
          <select
            value={formData.rank}
            onChange={(e) => setFormData(prev => ({ ...prev, rank: e.target.value }))}
            disabled={!formData.badge}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500/20 focus:outline-none focus:ring-2 disabled:opacity-50"
          >
            <option value="">Rütbe seçin</option>
            {formData.badge && ranks[formData.badge as keyof typeof ranks]?.map((rank) => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
        </div>
      </div>

      <Button
        onClick={handleCalculate}
        fullWidth
        size="lg"
        icon={Calculator}
      >
        Terfi Hesapla
      </Button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-lg border-l-4 ${
            result.success 
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
              : 'border-red-500 bg-red-50 dark:bg-red-900/20'
          }`}
        >
          <h3 className={`font-semibold mb-2 ${
            result.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
          }`}>
            Terfi Sonucu
          </h3>
          <p className={`mb-3 ${
            result.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
          }`}>
            {result.message}
          </p>
          
          {result.success && (
            <Button
              onClick={copyResult}
              variant="outline"
              size="sm"
              icon={Copy}
            >
              Sonucu Kopyala
            </Button>
          )}
        </motion.div>
      )}
    </Card>
  );
}
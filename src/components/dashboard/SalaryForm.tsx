import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { DollarSign, Copy, Calculator } from 'lucide-react';
import { calculateSalaryRating } from '../../utils/promotionCalculator';
import { discordAPI } from '../../services/api';
import toast from 'react-hot-toast';

export function SalaryForm() {
  const [formData, setFormData] = useState({
    userName: '',
    workHours: '',
    extraWorkHours: '',
    afkMinutes: ''
  });
  
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!formData.userName || !formData.workHours) {
      toast.error('Lütfen kullanıcı adı ve çalışma saatini girin!');
      return;
    }

    setLoading(true);

    const workHours = parseFloat(formData.workHours);
    const extraWorkHours = parseFloat(formData.extraWorkHours) || 0;
    const afkMinutes = parseFloat(formData.afkMinutes) || 0;

    const calculationResult = calculateSalaryRating(workHours, extraWorkHours, afkMinutes);
    setResult(calculationResult);

    // Discord'a log gönder
    await discordAPI.sendLog({
      title: '💰 Maaş Rozeti Hesaplandı',
      description: `${formData.userName} için maaş rozeti hesaplandı`,
      color: 0xffd700,
      fields: [
        { name: 'Çalışma Saati', value: `${workHours} saat`, inline: true },
        { name: 'Ek Çalışma', value: `${extraWorkHours} saat`, inline: true },
        { name: 'AFK Süresi', value: `${afkMinutes} dakika`, inline: true },
        { name: 'Maaş Rozeti', value: calculationResult.rating.toString(), inline: true },
        { name: 'Ek Maaş Rozeti', value: calculationResult.extraRating.toString(), inline: true },
        { name: 'Toplam', value: calculationResult.totalRating.toString(), inline: true }
      ],
      username: formData.userName
    });

    setLoading(false);
    toast.success('Maaş rozeti hesaplandı!');
  };

  const copyResult = () => {
    if (result) {
      const resultText = `${formData.userName} > Maaş Rozeti: ${result.rating}, Ek Maaş Rozeti: ${result.extraRating}, Toplam: ${result.totalRating}`;
      navigator.clipboard.writeText(resultText);
      toast.success('Sonuç panoya kopyalandı!');
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <DollarSign className="w-6 h-6 mr-2 text-red-500" />
        Maaş Rozeti Hesaplama
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
          label="Çalışma Saati"
          type="number"
          step="0.1"
          placeholder="Çalışma saatini girin"
          value={formData.workHours}
          onChange={(e) => setFormData(prev => ({ ...prev, workHours: e.target.value }))}
          fullWidth
        />

        <Input
          label="Ek Çalışma Saati (Opsiyonel)"
          type="number"
          step="0.1"
          placeholder="Ek çalışma saatini girin"
          value={formData.extraWorkHours}
          onChange={(e) => setFormData(prev => ({ ...prev, extraWorkHours: e.target.value }))}
          fullWidth
        />

        <Input
          label="AFK Kalma Süresi (Dakika)"
          type="number"
          placeholder="AFK kalma süresini girin"
          value={formData.afkMinutes}
          onChange={(e) => setFormData(prev => ({ ...prev, afkMinutes: e.target.value }))}
          fullWidth
        />
      </div>

      <Button
        onClick={handleCalculate}
        fullWidth
        size="lg"
        loading={loading}
        disabled={loading}
        icon={Calculator}
      >
        Maaş Rozeti Hesapla
      </Button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20"
        >
          <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">
            Maaş Rozeti Sonucu
          </h3>
          <div className="space-y-2 text-green-700 dark:text-green-300">
            <p><strong>Maaş Rozeti:</strong> {result.rating}</p>
            <p><strong>Ek Maaş Rozeti:</strong> {result.extraRating}</p>
            <p><strong>Toplam Rozet:</strong> {result.totalRating}</p>
            <p className="text-sm italic">{result.message}</p>
          </div>
          
          <Button
            onClick={copyResult}
            variant="outline"
            size="sm"
            icon={Copy}
            className="mt-3"
          >
            Sonucu Kopyala
          </Button>
        </motion.div>
      )}
    </Card>
  );
}
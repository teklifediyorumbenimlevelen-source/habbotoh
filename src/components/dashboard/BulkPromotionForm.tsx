import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Users, Upload, Download, Copy } from 'lucide-react';
import { calculatePromotion } from '../../utils/promotionCalculator';
import { discordAPI } from '../../services/api';
import { ranks, badgeNames } from '../../data/promotionData';
import toast from 'react-hot-toast';

export function BulkPromotionForm() {
  const [userList, setUserList] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [badge, setBadge] = useState('');
  const [rank, setRank] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBulkPromotion = async () => {
    if (!userList.trim() || !workTime || !badge || !rank) {
      toast.error('Lütfen tüm alanları doldurun!');
      return;
    }

    setLoading(true);
    const users = userList.split('\n').filter(user => user.trim());
    const promotionResults: any[] = [];

    for (const userName of users) {
      const trimmedName = userName.trim();
      if (trimmedName) {
        const result = calculatePromotion({
          userName: trimmedName,
          workTime: parseInt(workTime),
          badge,
          rank
        });
        promotionResults.push({ userName: trimmedName, ...result });
      }
    }

    setResults(promotionResults);

    // Discord'a toplu terfi logu gönder
    const successCount = promotionResults.filter(r => r.success).length;
    const failCount = promotionResults.length - successCount;

    await discordAPI.sendLog({
      title: '👥 Toplu Terfi İşlemi',
      description: `${promotionResults.length} kullanıcı için toplu terfi işlemi yapıldı`,
      color: 0x9932cc,
      fields: [
        { name: 'Başarılı', value: successCount.toString(), inline: true },
        { name: 'Başarısız', value: failCount.toString(), inline: true },
        { name: 'Rozet', value: badgeNames[badge as keyof typeof badgeNames], inline: true },
        { name: 'Rütbe', value: rank, inline: true },
        { name: 'Çalışma Süresi', value: `${workTime} dakika`, inline: true }
      ]
    });

    setLoading(false);
    toast.success(`Toplu terfi tamamlandı! ${successCount} başarılı, ${failCount} başarısız`);
  };

  const copyResults = () => {
    const resultText = results
      .filter(r => r.success)
      .map(r => r.message)
      .join('\n');
    
    if (resultText) {
      navigator.clipboard.writeText(resultText);
      toast.success('Başarılı terfiler panoya kopyalandı!');
    }
  };

  const downloadTemplate = () => {
    const template = 'kullanici1\nkullanici2\nkullanici3\n';
    const blob = new Blob([template], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'toplu_terfi_sablonu.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Users className="w-6 h-6 mr-2 text-red-500" />
        Toplu Terfi Yönetimi
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kullanıcı Listesi
            </label>
            <textarea
              className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500/20 focus:outline-none focus:ring-2 resize-none"
              placeholder="Her satıra bir kullanıcı adı yazın..."
              value={userList}
              onChange={(e) => setUserList(e.target.value)}
            />
            <Button
              onClick={downloadTemplate}
              variant="ghost"
              size="sm"
              icon={Download}
              className="mt-2"
            >
              Şablon İndir
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Çalışma Süresi (dakika)"
            type="number"
            placeholder="Çalışma süresini girin"
            value={workTime}
            onChange={(e) => setWorkTime(e.target.value)}
            fullWidth
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rozet Seçimi
            </label>
            <select
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
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
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              disabled={!badge}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500/20 focus:outline-none focus:ring-2 disabled:opacity-50"
            >
              <option value="">Rütbe seçin</option>
              {badge && ranks[badge as keyof typeof ranks]?.map((rankOption) => (
                <option key={rankOption} value={rankOption}>{rankOption}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Button
        onClick={handleBulkPromotion}
        fullWidth
        size="lg"
        loading={loading}
        disabled={loading}
        icon={Upload}
      >
        Toplu Terfi Uygula
      </Button>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Toplu Terfi Sonuçları
            </h3>
            <Button
              onClick={copyResults}
              variant="outline"
              size="sm"
              icon={Copy}
            >
              Başarılı Terfiler Kopyala
            </Button>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  result.success 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <p className={`font-medium ${
                  result.success 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {result.userName}
                </p>
                <p className={`text-sm ${
                  result.success 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  {result.message}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </Card>
  );
}
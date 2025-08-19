import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { GraduationCap, Plus, Users, Calendar, Copy } from 'lucide-react';
import { discordAPI } from '../../services/api';
import toast from 'react-hot-toast';

interface Training {
  id: string;
  title: string;
  instructor: string;
  participants: string[];
  date: string;
  duration: number; // minutes
  status: 'planned' | 'ongoing' | 'completed';
  description: string;
}

export function EducationForm() {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    participants: '',
    date: '',
    time: '',
    duration: '60',
    description: ''
  });
  
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(false);

  const trainingTemplates = [
    'Temel Güvenlik Eğitimi',
    'İleri Seviye Operasyon Eğitimi',
    'Liderlik ve Yönetim Eğitimi',
    'İletişim ve Protokol Eğitimi',
    'Acil Durum Müdahale Eğitimi',
    'Silah Kullanım Eğitimi',
    'Takım Çalışması Eğitimi'
  ];

  const handleCreateTraining = async () => {
    if (!formData.title || !formData.instructor || !formData.participants || !formData.date || !formData.time) {
      toast.error('Lütfen tüm zorunlu alanları doldurun!');
      return;
    }

    setLoading(true);

    const participants = formData.participants
      .split('\n')
      .map(p => p.trim())
      .filter(p => p);

    const trainingDateTime = new Date(`${formData.date}T${formData.time}`);

    const newTraining: Training = {
      id: Date.now().toString(),
      title: formData.title,
      instructor: formData.instructor,
      participants,
      date: trainingDateTime.toISOString(),
      duration: parseInt(formData.duration),
      status: 'planned',
      description: formData.description
    };

    setTrainings(prev => [...prev, newTraining]);

    // Discord'a log gönder
    await discordAPI.sendLog({
      title: '🎓 Eğitim Planlandı',
      description: `Yeni eğitim planlandı: ${formData.title}`,
      color: 0x0099ff,
      fields: [
        { name: 'Eğitmen', value: formData.instructor, inline: true },
        { name: 'Katılımcı Sayısı', value: participants.length.toString(), inline: true },
        { name: 'Tarih', value: trainingDateTime.toLocaleDateString('tr-TR'), inline: true },
        { name: 'Saat', value: trainingDateTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }), inline: true },
        { name: 'Süre', value: `${formData.duration} dakika`, inline: true },
        { name: 'Açıklama', value: formData.description || 'Belirtilmemiş', inline: false }
      ]
    });

    // Form temizle
    setFormData({
      title: '',
      instructor: '',
      participants: '',
      date: '',
      time: '',
      duration: '60',
      description: ''
    });

    setLoading(false);
    toast.success('Eğitim başarıyla planlandı!');
  };

  const updateTrainingStatus = async (trainingId: string, newStatus: Training['status']) => {
    setTrainings(prev => prev.map(t => 
      t.id === trainingId ? { ...t, status: newStatus } : t
    ));

    const training = trainings.find(t => t.id === trainingId);
    if (training) {
      const statusText = {
        planned: 'Planlandı',
        ongoing: 'Devam Ediyor',
        completed: 'Tamamlandı'
      };

      await discordAPI.sendLog({
        title: '📚 Eğitim Durumu Güncellendi',
        description: `${training.title} eğitiminin durumu güncellendi`,
        color: newStatus === 'completed' ? 0x00ff00 : 0xffa500,
        fields: [
          { name: 'Durum', value: statusText[newStatus], inline: true },
          { name: 'Eğitmen', value: training.instructor, inline: true },
          { name: 'Katılımcı Sayısı', value: training.participants.length.toString(), inline: true }
        ]
      });

      toast.success(`Eğitim durumu "${statusText[newStatus]}" olarak güncellendi!`);
    }
  };

  const copyTrainingList = () => {
    const trainingText = trainings
      .map(t => {
        const date = new Date(t.date);
        return `${t.title} - ${t.instructor} - ${date.toLocaleDateString('tr-TR')} ${date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })} (${t.participants.length} katılımcı)`;
      })
      .join('\n');
    
    if (trainingText) {
      navigator.clipboard.writeText(trainingText);
      toast.success('Eğitim listesi panoya kopyalandı!');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <GraduationCap className="w-6 h-6 mr-2 text-red-500" />
          Eğitim Yönetimi
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Eğitim Başlığı
              </label>
              <select
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500/20 focus:outline-none focus:ring-2"
              >
                <option value="">Eğitim türü seçin</option>
                {trainingTemplates.map(template => (
                  <option key={template} value={template}>{template}</option>
                ))}
                <option value="custom">Özel Eğitim</option>
              </select>
              {formData.title === 'custom' && (
                <Input
                  placeholder="Özel eğitim başlığını girin"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  fullWidth
                />
              )}
            </div>

            <Input
              label="Eğitmen"
              placeholder="Eğitmen adını girin"
              value={formData.instructor}
              onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
              fullWidth
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Tarih"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                fullWidth
              />

              <Input
                label="Saat"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                fullWidth
              />
            </div>

            <Input
              label="Süre (Dakika)"
              type="number"
              placeholder="60"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              fullWidth
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Katılımcılar
              </label>
              <textarea
                className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500/20 focus:outline-none focus:ring-2 resize-none"
                placeholder="Her satıra bir katılımcı adı yazın..."
                value={formData.participants}
                onChange={(e) => setFormData(prev => ({ ...prev, participants: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Açıklama (Opsiyonel)
              </label>
              <textarea
                className="w-full h-24 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500/20 focus:outline-none focus:ring-2 resize-none"
                placeholder="Eğitim hakkında ek bilgiler..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleCreateTraining}
          fullWidth
          size="lg"
          loading={loading}
          disabled={loading}
          icon={Plus}
        >
          Eğitim Planla
        </Button>
      </Card>

      {trainings.length > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Planlanan Eğitimler ({trainings.length})
            </h3>
            <Button
              onClick={copyTrainingList}
              variant="outline"
              size="sm"
              icon={Copy}
            >
              Listeyi Kopyala
            </Button>
          </div>

          <div className="space-y-4">
            {trainings.map((training) => (
              <motion.div
                key={training.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {training.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Eğitmen: {training.instructor}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(training.date).toLocaleDateString('tr-TR')} - {new Date(training.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => updateTrainingStatus(training.id, 'ongoing')}
                      variant={training.status === 'ongoing' ? 'primary' : 'outline'}
                      size="sm"
                      disabled={training.status === 'completed'}
                    >
                      Başlat
                    </Button>
                    <Button
                      onClick={() => updateTrainingStatus(training.id, 'completed')}
                      variant={training.status === 'completed' ? 'primary' : 'outline'}
                      size="sm"
                    >
                      Tamamla
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {training.participants.length} katılımcı
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {training.duration} dakika
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    training.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                      : training.status === 'ongoing'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200'
                  }`}>
                    {training.status === 'completed' ? 'Tamamlandı' : 
                     training.status === 'ongoing' ? 'Devam Ediyor' : 'Planlandı'}
                  </span>
                </div>

                {training.description && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {training.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
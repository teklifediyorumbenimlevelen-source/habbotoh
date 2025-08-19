import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CreditCard, Plus, Trash2, Copy } from 'lucide-react';
import { discordAPI } from '../../services/api';
import toast from 'react-hot-toast';

interface License {
  id: string;
  userName: string;
  licenseType: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'suspended';
}

export function LicenseForm() {
  const [formData, setFormData] = useState({
    userName: '',
    licenseType: '',
    duration: '30' // days
  });
  
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(false);

  const licenseTypes = [
    'Araç Kullanma Lisansı',
    'Silah Taşıma Lisansı',
    'Özel Güvenlik Lisansı',
    'Eğitmen Lisansı',
    'Yönetici Lisansı',
    'Operasyon Lisansı'
  ];

  const handleIssueLicense = async () => {
    if (!formData.userName || !formData.licenseType) {
      toast.error('Lütfen kullanıcı adı ve lisans türünü seçin!');
      return;
    }

    setLoading(true);

    const issueDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(issueDate.getDate() + parseInt(formData.duration));

    const newLicense: License = {
      id: Date.now().toString(),
      userName: formData.userName,
      licenseType: formData.licenseType,
      issueDate: issueDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: 'active'
    };

    setLicenses(prev => [...prev, newLicense]);

    // Discord'a log gönder
    await discordAPI.sendLog({
      title: '📜 Lisans Verildi',
      description: `${formData.userName} kullanıcısına yeni lisans verildi`,
      color: 0x00ff00,
      fields: [
        { name: 'Lisans Türü', value: formData.licenseType, inline: true },
        { name: 'Geçerlilik Süresi', value: `${formData.duration} gün`, inline: true },
        { name: 'Son Geçerlilik', value: expiryDate.toLocaleDateString('tr-TR'), inline: true }
      ],
      username: formData.userName
    });

    // Form temizle
    setFormData({ userName: '', licenseType: '', duration: '30' });
    setLoading(false);
    toast.success('Lisans başarıyla verildi!');
  };

  const handleRevokeLicense = async (license: License) => {
    setLicenses(prev => prev.filter(l => l.id !== license.id));

    await discordAPI.sendLog({
      title: '🚫 Lisans İptal Edildi',
      description: `${license.userName} kullanıcısının lisansı iptal edildi`,
      color: 0xff0000,
      fields: [
        { name: 'Lisans Türü', value: license.licenseType, inline: true },
        { name: 'İptal Tarihi', value: new Date().toLocaleDateString('tr-TR'), inline: true }
      ],
      username: license.userName
    });

    toast.success('Lisans iptal edildi!');
  };

  const copyLicenseList = () => {
    const licenseText = licenses
      .filter(l => l.status === 'active')
      .map(l => `${l.userName} - ${l.licenseType} (${new Date(l.expiryDate).toLocaleDateString('tr-TR')} tarihine kadar geçerli)`)
      .join('\n');
    
    if (licenseText) {
      navigator.clipboard.writeText(licenseText);
      toast.success('Lisans listesi panoya kopyalandı!');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <CreditCard className="w-6 h-6 mr-2 text-red-500" />
          Lisans Yönetimi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Input
            label="Kullanıcı Adı"
            placeholder="Kullanıcı adını girin"
            value={formData.userName}
            onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
            fullWidth
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Lisans Türü
            </label>
            <select
              value={formData.licenseType}
              onChange={(e) => setFormData(prev => ({ ...prev, licenseType: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-red-500 focus:ring-red-500/20 focus:outline-none focus:ring-2"
            >
              <option value="">Lisans türü seçin</option>
              {licenseTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <Input
            label="Geçerlilik Süresi (Gün)"
            type="number"
            placeholder="30"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            fullWidth
          />
        </div>

        <Button
          onClick={handleIssueLicense}
          fullWidth
          size="lg"
          loading={loading}
          disabled={loading}
          icon={Plus}
        >
          Lisans Ver
        </Button>
      </Card>

      {licenses.length > 0 && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Verilen Lisanslar ({licenses.length})
            </h3>
            <Button
              onClick={copyLicenseList}
              variant="outline"
              size="sm"
              icon={Copy}
            >
              Listeyi Kopyala
            </Button>
          </div>

          <div className="space-y-3">
            {licenses.map((license) => (
              <motion.div
                key={license.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {license.userName}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {license.licenseType}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {new Date(license.expiryDate).toLocaleDateString('tr-TR')} tarihine kadar geçerli
                  </p>
                </div>
                <Button
                  onClick={() => handleRevokeLicense(license)}
                  variant="outline"
                  size="sm"
                  icon={Trash2}
                  className="text-red-600 hover:text-red-700"
                >
                  İptal Et
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, DollarSign, Users, Clock } from 'lucide-react';

type StatsPeriod = 'daily' | 'weekly' | 'monthly';

function PaymentStatistics() {
  const [selectedPeriod, setSelectedPeriod] = useState<StatsPeriod>('daily');

  // Demo data
  const stats = {
    daily: {
      totalPayments: 45,
      totalAmount: 125000,
      approvedPayments: 38,
      rejectedPayments: 4,
      pendingPayments: 3,
      averageAmount: 2777,
      topService: 'Hızlı Transfer',
      topBank: 'Vakıfbank'
    },
    weekly: {
      totalPayments: 312,
      totalAmount: 850000,
      approvedPayments: 285,
      rejectedPayments: 18,
      pendingPayments: 9,
      averageAmount: 2724,
      topService: 'Premium Transfer',
      topBank: 'Garanti BBVA'
    },
    monthly: {
      totalPayments: 1250,
      totalAmount: 3200000,
      approvedPayments: 1180,
      rejectedPayments: 45,
      pendingPayments: 25,
      averageAmount: 2560,
      topService: 'Standart Transfer',
      topBank: 'İş Bankası'
    }
  };

  const dailyData = [
    { day: 'Pzt', amount: 15000, count: 8 },
    { day: 'Sal', amount: 22000, count: 12 },
    { day: 'Çar', amount: 18000, count: 9 },
    { day: 'Per', amount: 28000, count: 15 },
    { day: 'Cum', amount: 25000, count: 11 },
    { day: 'Cmt', amount: 12000, count: 6 },
    { day: 'Paz', amount: 8000, count: 4 }
  ];

  const serviceStats = [
    { name: 'Hızlı Transfer', count: 180, percentage: 45, color: 'from-blue-500 to-blue-600' },
    { name: 'Premium Transfer', count: 120, percentage: 30, color: 'from-emerald-500 to-emerald-600' },
    { name: 'Standart Transfer', count: 100, percentage: 25, color: 'from-purple-500 to-purple-600' }
  ];

  const bankStats = [
    { name: 'Vakıfbank', count: 95, percentage: 38, color: 'from-red-500 to-red-600' },
    { name: 'Garanti BBVA', count: 75, percentage: 30, color: 'from-green-500 to-green-600' },
    { name: 'İş Bankası', count: 50, percentage: 20, color: 'from-blue-500 to-blue-600' },
    { name: 'Ziraat Bankası', count: 30, percentage: 12, color: 'from-yellow-500 to-yellow-600' }
  ];

  const currentStats = stats[selectedPeriod];
  const maxAmount = Math.max(...dailyData.map(d => d.amount));

  const getPeriodText = (period: StatsPeriod) => {
    switch (period) {
      case 'daily':
        return 'Günlük';
      case 'weekly':
        return 'Haftalık';
      case 'monthly':
        return 'Aylık';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Ödeme İstatistikleri</h1>
          <p className="text-slate-400">Detaylı ödeme analizi ve raporları</p>
        </div>
        
        <div className="flex bg-slate-800/50 rounded-xl p-1">
          {(['daily', 'weekly', 'monthly'] as StatsPeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPeriod === period
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {getPeriodText(period)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-lg rounded-2xl border border-blue-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Toplam Ödeme</p>
              <p className="text-3xl font-bold text-white mt-1">{currentStats.totalPayments}</p>
              <p className="text-blue-300 text-xs mt-1">
                Ortalama: ₺{currentStats.averageAmount.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-lg rounded-2xl border border-emerald-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-400 text-sm font-medium">Toplam Tutar</p>
              <p className="text-3xl font-bold text-white mt-1">₺{currentStats.totalAmount.toLocaleString()}</p>
              <p className="text-emerald-300 text-xs mt-1">
                Onaylanan: {currentStats.approvedPayments}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 backdrop-blur-lg rounded-2xl border border-yellow-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Bekleyen</p>
              <p className="text-3xl font-bold text-white mt-1">{currentStats.pendingPayments}</p>
              <p className="text-yellow-300 text-xs mt-1">
                Reddedilen: {currentStats.rejectedPayments}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Başarı Oranı</p>
              <p className="text-3xl font-bold text-white mt-1">
                {Math.round((currentStats.approvedPayments / currentStats.totalPayments) * 100)}%
              </p>
              <p className="text-purple-300 text-xs mt-1">
                En Popüler: {currentStats.topService}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Daily Chart */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-400" />
            Haftalık Ödeme Grafiği
          </h2>
          
          <div className="space-y-4">
            {dailyData.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-8 text-slate-400 text-sm font-medium">{day.day}</div>
                <div className="flex-1 relative">
                  <div className="h-8 bg-slate-900/50 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg transition-all duration-1000 ease-out"
                      style={{ width: `${(day.amount / maxAmount) * 100}%` }}
                    ></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-white text-sm font-medium">
                      ₺{day.amount.toLocaleString()}
                    </span>
                    <span className="text-slate-300 text-xs">
                      {day.count} işlem
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <Users className="h-5 w-5 mr-2 text-emerald-400" />
            Servis Dağılımı
          </h2>
          
          <div className="space-y-4">
            {serviceStats.map((service, index) => (
              <div key={service.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{service.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 text-sm">{service.count} işlem</span>
                    <span className="text-white font-semibold">{service.percentage}%</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-900/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${service.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${service.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bank Statistics */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-purple-400" />
          Banka Bazlı İstatistikler
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bankStats.map((bank, index) => (
            <div key={bank.name} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium">{bank.name}</h3>
                <div className={`w-8 h-8 bg-gradient-to-r ${bank.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-xs">
                    {bank.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">İşlem Sayısı</span>
                  <span className="text-white font-semibold">{bank.count}</span>
                </div>
                
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${bank.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${bank.percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Oran</span>
                  <span className="text-white font-semibold">{bank.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaymentStatistics;
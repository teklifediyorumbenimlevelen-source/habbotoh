import React from 'react';
import { User } from '../../App';
import { Wallet, TrendingUp, Calendar, Clock } from 'lucide-react';

interface DashboardHomeProps {
  user: User;
}

function DashboardHome({ user }: DashboardHomeProps) {
  // Demo data
  const stats = {
    activeAccounts: 15,
    todayPayments: 125000,
    weeklyPayments: 850000
  };

  const recentPayments = [
    { id: 1, bank: 'Vakıfbank', amount: 2500, time: '10:30', status: 'completed' },
    { id: 2, bank: 'Garanti BBVA', amount: 1800, time: '09:15', status: 'pending' },
    { id: 3, bank: 'İş Bankası', amount: 3200, time: '08:45', status: 'completed' },
    { id: 4, bank: 'Ziraat Bankası', amount: 1500, time: '07:30', status: 'completed' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Hoş Geldin, <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">{user.username}</span>
        </h1>
        <p className="text-slate-400">İşlemlerinizi takip edin ve yeni transferler yapın</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-lg rounded-2xl border border-blue-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Aktif Hesaplar</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.activeAccounts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Wallet className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 backdrop-blur-lg rounded-2xl border border-emerald-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-400 text-sm font-medium">Bugünkü Ödemeler</p>
              <p className="text-3xl font-bold text-white mt-1">₺{stats.todayPayments.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Haftalık Ödemeler</p>
              <p className="text-3xl font-bold text-white mt-1">₺{stats.weeklyPayments.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-400" />
            Son İşlemler
          </h2>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
            Tümünü Gör
          </button>
        </div>

        <div className="space-y-4">
          {recentPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {payment.bank.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{payment.bank}</p>
                  <p className="text-slate-400 text-sm">{payment.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-white font-semibold">₺{payment.amount.toLocaleString()}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    payment.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {payment.status === 'completed' ? 'Tamamlandı' : 'Bekliyor'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
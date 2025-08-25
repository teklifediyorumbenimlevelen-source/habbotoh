import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, CreditCard, Eye, EyeOff } from 'lucide-react';

type Bank = {
  id: string;
  name: string;
  code: string;
};

type Service = {
  id: string;
  name: string;
};

type Account = {
  id: string;
  bankId: string;
  serviceId: string;
  accountName: string;
  accountNumber: string;
  balance: number;
  isActive: boolean;
  createdAt: string;
};

function AccountManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBank, setFilterBank] = useState('all');
  const [filterService, setFilterService] = useState('all');

  // Demo data
  const banks: Bank[] = [
    { id: '1', name: 'Vakıfbank', code: 'VKF' },
    { id: '2', name: 'Ziraat Bankası', code: 'ZRT' },
    { id: '3', name: 'Garanti BBVA', code: 'GAR' },
    { id: '4', name: 'İş Bankası', code: 'ISB' },
    { id: '5', name: 'TEB', code: 'TEB' },
  ];

  const services: Service[] = [
    { id: '1', name: 'Hızlı Transfer' },
    { id: '2', name: 'Standart Transfer' },
    { id: '3', name: 'Premium Transfer' },
  ];

  const [accounts, setAccounts] = useState<Account[]>([
    { id: '1', bankId: '1', serviceId: '1', accountName: 'Mehmet Demir', accountNumber: '1234567890123456', balance: 25000, isActive: true, createdAt: '2024-01-15' },
    { id: '2', bankId: '1', serviceId: '2', accountName: 'Ayşe Kara', accountNumber: '2345678901234567', balance: 18500, isActive: true, createdAt: '2024-01-16' },
    { id: '3', bankId: '2', serviceId: '1', accountName: 'Ali Yılmaz', accountNumber: '3456789012345678', balance: 32000, isActive: true, createdAt: '2024-01-17' },
    { id: '4', bankId: '3', serviceId: '2', accountName: 'Fatma Özkan', accountNumber: '4567890123456789', balance: 42000, isActive: false, createdAt: '2024-01-18' },
    { id: '5', bankId: '4', serviceId: '3', accountName: 'Can Yurt', accountNumber: '5678901234567890', balance: 15000, isActive: true, createdAt: '2024-01-19' },
  ]);

  const [newAccount, setNewAccount] = useState({
    bankId: '',
    serviceId: '',
    accountName: '',
    accountNumber: '',
    balance: 0,
  });

  const getBankName = (bankId: string) => {
    return banks.find(bank => bank.id === bankId)?.name || 'Bilinmiyor';
  };

  const getServiceName = (serviceId: string) => {
    return services.find(service => service.id === serviceId)?.name || 'Bilinmiyor';
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.accountNumber.includes(searchTerm);
    const matchesBank = filterBank === 'all' || account.bankId === filterBank;
    const matchesService = filterService === 'all' || account.serviceId === filterService;
    
    return matchesSearch && matchesBank && matchesService;
  });

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const account: Account = {
      id: Date.now().toString(),
      ...newAccount,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAccounts([...accounts, account]);
    setNewAccount({ bankId: '', serviceId: '', accountName: '', accountNumber: '', balance: 0 });
    setShowAddModal(false);
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
    setNewAccount({
      bankId: account.bankId,
      serviceId: account.serviceId,
      accountName: account.accountName,
      accountNumber: account.accountNumber,
      balance: account.balance,
    });
    setShowAddModal(true);
  };

  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAccount) {
      setAccounts(accounts.map(account => 
        account.id === editingAccount.id
          ? { ...account, ...newAccount }
          : account
      ));
      setEditingAccount(null);
      setNewAccount({ bankId: '', serviceId: '', accountName: '', accountNumber: '', balance: 0 });
      setShowAddModal(false);
    }
  };

  const handleDeleteAccount = (accountId: string) => {
    if (confirm('Bu hesabı silmek istediğinizden emin misiniz?')) {
      setAccounts(accounts.filter(account => account.id !== accountId));
    }
  };

  const toggleAccountStatus = (accountId: string) => {
    setAccounts(accounts.map(account =>
      account.id === accountId
        ? { ...account, isActive: !account.isActive }
        : account
    ));
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingAccount(null);
    setNewAccount({ bankId: '', serviceId: '', accountName: '', accountNumber: '', balance: 0 });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Hesap Yönetimi</h1>
          <p className="text-slate-400">Banka hesaplarını görüntüleyin, ekleyin ve düzenleyin</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Yeni Hesap</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Toplam Hesap</p>
              <p className="text-2xl font-bold text-white">{accounts.length}</p>
            </div>
            <CreditCard className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Aktif Hesap</p>
              <p className="text-2xl font-bold text-emerald-400">
                {accounts.filter(acc => acc.isActive).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Toplam Bakiye</p>
              <p className="text-2xl font-bold text-yellow-400">
                ₺{accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-yellow-400 font-bold text-sm">₺</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Pasif Hesap</p>
              <p className="text-2xl font-bold text-red-400">
                {accounts.filter(acc => !acc.isActive).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-red-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Hesap ara..."
            />
          </div>
          
          <select
            value={filterBank}
            onChange={(e) => setFilterBank(e.target.value)}
            className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Bankalar</option>
            {banks.map(bank => (
              <option key={bank.id} value={bank.id}>{bank.name}</option>
            ))}
          </select>

          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Servisler</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Hesap Sahibi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Hesap No
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Banka
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Servis
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Bakiye
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-medium text-sm">
                          {account.accountName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{account.accountName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-300">
                      {account.accountNumber.replace(/(.{4})/g, '$1 ').trim()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{getBankName(account.bankId)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{getServiceName(account.serviceId)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-emerald-400">
                      ₺{account.balance.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleAccountStatus(account.id)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                        account.isActive
                          ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      }`}
                    >
                      {account.isActive ? 'Aktif' : 'Pasif'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {new Date(account.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditAccount(account)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAccount(account.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingAccount ? 'Hesap Düzenle' : 'Yeni Hesap Ekle'}
            </h2>
            
            <form onSubmit={editingAccount ? handleUpdateAccount : handleAddAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Hesap Sahibi
                </label>
                <input
                  type="text"
                  value={newAccount.accountName}
                  onChange={(e) => setNewAccount({ ...newAccount, accountName: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Hesap sahibinin adı"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Hesap Numarası
                </label>
                <input
                  type="text"
                  value={newAccount.accountNumber}
                  onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234567890123456"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Banka
                </label>
                <select
                  value={newAccount.bankId}
                  onChange={(e) => setNewAccount({ ...newAccount, bankId: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Banka Seçin</option>
                  {banks.map(bank => (
                    <option key={bank.id} value={bank.id}>{bank.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Servis
                </label>
                <select
                  value={newAccount.serviceId}
                  onChange={(e) => setNewAccount({ ...newAccount, serviceId: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Servis Seçin</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bakiye (₺)
                </label>
                <input
                  type="number"
                  value={newAccount.balance}
                  onChange={(e) => setNewAccount({ ...newAccount, balance: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  {editingAccount ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountManagement;
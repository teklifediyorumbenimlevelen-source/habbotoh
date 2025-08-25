import React, { useState } from 'react';
import { User } from '../../App';
import { ArrowRight, CheckCircle, Clock, CreditCard } from 'lucide-react';

interface TransferMoneyProps {
  user: User;
}

type Service = {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  fee: number;
};

type Bank = {
  id: string;
  name: string;
  code: string;
};

type Account = {
  id: string;
  bankId: string;
  serviceId: string;
  accountName: string;
  accountNumber: string;
  balance: number;
};

function TransferMoney({ user }: TransferMoneyProps) {
  const [step, setStep] = useState<'amount' | 'service' | 'bank' | 'account' | 'confirm' | 'success'>('amount');
  const [amount, setAmount] = useState<string>('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  // Demo data
  const services: Service[] = [
    { id: '1', name: 'Hızlı Transfer', minAmount: 100, maxAmount: 5000, fee: 10 },
    { id: '2', name: 'Standart Transfer', minAmount: 500, maxAmount: 15000, fee: 25 },
    { id: '3', name: 'Premium Transfer', minAmount: 1000, maxAmount: 50000, fee: 50 },
  ];

  const banks: Bank[] = [
    { id: '1', name: 'Vakıfbank', code: 'VKF' },
    { id: '2', name: 'Ziraat Bankası', code: 'ZRT' },
    { id: '3', name: 'Garanti BBVA', code: 'GAR' },
    { id: '4', name: 'İş Bankası', code: 'ISB' },
    { id: '5', name: 'TEB', code: 'TEB' },
  ];

  const accounts: Account[] = [
    { id: '1', bankId: '1', serviceId: '1', accountName: 'Mehmet Demir', accountNumber: '**** **** 1234', balance: 25000 },
    { id: '2', bankId: '1', serviceId: '2', accountName: 'Ayşe Kara', accountNumber: '**** **** 5678', balance: 18500 },
    { id: '3', bankId: '2', serviceId: '1', accountName: 'Ali Yılmaz', accountNumber: '**** **** 9012', balance: 32000 },
    { id: '4', bankId: '3', serviceId: '2', accountName: 'Fatma Özkan', accountNumber: '**** **** 3456', balance: 42000 },
  ];

  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      setStep('service');
    }
  };

  const handleServiceSelect = (service: Service) => {
    const numAmount = parseFloat(amount);
    if (numAmount >= service.minAmount && numAmount <= service.maxAmount) {
      setSelectedService(service);
      setStep('bank');
    } else {
      alert(`Bu servis için minimum ${service.minAmount}₺, maksimum ${service.maxAmount}₺ transfer yapabilirsiniz.`);
    }
  };

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setStep('account');
  };

  const handleAccountSelect = (account: Account) => {
    setSelectedAccount(account);
    setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('success');
  };

  const getAvailableServices = () => {
    const numAmount = parseFloat(amount);
    return services.filter(service => 
      numAmount >= service.minAmount && numAmount <= service.maxAmount
    );
  };

  const getAvailableAccounts = () => {
    return accounts.filter(account => 
      account.bankId === selectedBank?.id && account.serviceId === selectedService?.id
    );
  };

  const resetTransfer = () => {
    setStep('amount');
    setAmount('');
    setSelectedService(null);
    setSelectedBank(null);
    setSelectedAccount(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Para Transferi</h1>
        <p className="text-slate-400">Güvenli ve hızlı para transfer işlemi yapın</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8 space-x-4">
        {['amount', 'service', 'bank', 'account', 'confirm'].map((stepName, index) => (
          <div key={stepName} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === stepName
                  ? 'bg-blue-500 text-white'
                  : ['amount', 'service', 'bank', 'account', 'confirm'].indexOf(step) > index
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {['amount', 'service', 'bank', 'account', 'confirm'].indexOf(step) > index ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            {index < 4 && (
              <ArrowRight className="h-4 w-4 text-slate-600 mx-2" />
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-8">
        {step === 'amount' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Transfer Tutarını Girin</h2>
            <form onSubmit={handleAmountSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Transfer Tutarı (₺)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                Devam Et
              </button>
            </form>
          </div>
        )}

        {step === 'service' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Servis Seçin</h2>
            <div className="grid gap-4">
              {getAvailableServices().map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl text-left hover:border-blue-500/50 hover:bg-slate-900/70 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{service.name}</h3>
                      <p className="text-slate-400 text-sm">
                        {service.minAmount}₺ - {service.maxAmount}₺
                      </p>
                      <p className="text-blue-400 text-sm mt-1">İşlem Ücreti: {service.fee}₺</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'bank' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Banka Seçin</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => handleBankSelect(bank)}
                  className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl text-center hover:border-emerald-500/50 hover:bg-slate-900/70 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-medium">{bank.name}</h3>
                  <p className="text-slate-400 text-sm">{bank.code}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'account' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Hesap Seçin</h2>
            <div className="space-y-4">
              {getAvailableAccounts().map((account) => (
                <button
                  key={account.id}
                  onClick={() => handleAccountSelect(account)}
                  className="w-full p-6 bg-slate-900/50 border border-slate-700 rounded-xl text-left hover:border-purple-500/50 hover:bg-slate-900/70 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{account.accountName}</h3>
                      <p className="text-slate-400">{account.accountNumber}</p>
                      <p className="text-emerald-400 text-sm mt-1">
                        Bakiye: ₺{account.balance.toLocaleString()}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">İşlemi Onaylayın</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b border-slate-700">
                <span className="text-slate-400">Transfer Tutarı</span>
                <span className="text-white font-semibold">₺{parseFloat(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-700">
                <span className="text-slate-400">Servis</span>
                <span className="text-white">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-700">
                <span className="text-slate-400">Banka</span>
                <span className="text-white">{selectedBank?.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-700">
                <span className="text-slate-400">Hesap</span>
                <span className="text-white">{selectedAccount?.accountName}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-700">
                <span className="text-slate-400">İşlem Ücreti</span>
                <span className="text-white">₺{selectedService?.fee}</span>
              </div>
              <div className="flex justify-between py-3 text-lg font-semibold">
                <span className="text-white">Toplam Tutar</span>
                <span className="text-emerald-400">
                  ₺{(parseFloat(amount) + (selectedService?.fee || 0)).toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={handleConfirm}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              İşlemi Onayla
            </button>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">İşlem Başarıyla Gönderildi</h2>
            <p className="text-slate-400 mb-6">
              Transfer talebiniz admin onayına gönderildi. Onaylandığında bildirim alacaksınız.
            </p>
            <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-yellow-400">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Admin Onayı Bekleniyor</span>
              </div>
            </div>
            <button
              onClick={resetTransfer}
              className="py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200"
            >
              Yeni Transfer Yap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransferMoney;
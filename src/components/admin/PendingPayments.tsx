import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Eye, User, CreditCard, Calendar } from 'lucide-react';

type PendingPayment = {
  id: string;
  userId: string;
  username: string;
  amount: number;
  serviceName: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  fee: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  processedAt?: string;
};

function PendingPayments() {
  const [payments, setPayments] = useState<PendingPayment[]>([
    {
      id: '1',
      userId: 'user1',
      username: 'ahmet_yilmaz',
      amount: 2500,
      serviceName: 'Hızlı Transfer',
      bankName: 'Vakıfbank',
      accountName: 'Mehmet Demir',
      accountNumber: '1234567890123456',
      fee: 10,
      status: 'pending',
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      userId: 'user2',
      username: 'zeynep_kara',
      amount: 5000,
      serviceName: 'Premium Transfer',
      bankName: 'Garanti BBVA',
      accountName: 'Fatma Özkan',
      accountNumber: '4567890123456789',
      fee: 50,
      status: 'pending',
      createdAt: '2024-01-20T09:15:00Z'
    },
    {
      id: '3',
      userId: 'user3',
      username: 'can_ozturk',
      amount: 1800,
      serviceName: 'Standart Transfer',
      bankName: 'Ziraat Bankası',
      accountName: 'Ali Yılmaz',
      accountNumber: '3456789012345678',
      fee: 25,
      status: 'approved',
      createdAt: '2024-01-19T16:45:00Z',
      processedAt: '2024-01-19T17:00:00Z'
    }
  ]);

  const [selectedPayment, setSelectedPayment] = useState<PendingPayment | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleApprove = (paymentId: string) => {
    setPayments(payments.map(payment =>
      payment.id === paymentId
        ? { ...payment, status: 'approved' as const, processedAt: new Date().toISOString() }
        : payment
    ));
  };

  const handleReject = (paymentId: string) => {
    setPayments(payments.map(payment =>
      payment.id === paymentId
        ? { ...payment, status: 'rejected' as const, processedAt: new Date().toISOString() }
        : payment
    ));
  };

  const showDetails = (payment: PendingPayment) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  const pendingPayments = payments.filter(p => p.status === 'pending');
  const processedPayments = payments.filter(p => p.status !== 'pending');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'approved':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Bekliyor';
      case 'approved':
        return 'Onaylandı';
      case 'rejected':
        return 'Reddedildi';
      default:
        return 'Bilinmiyor';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Bekleyen Ödemeler</h1>
        <p className="text-slate-400">Kullanıcı ödemelerini onaylayın veya reddedin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Bekleyen Ödemeler</p>
              <p className="text-2xl font-bold text-yellow-400">{pendingPayments.length}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Toplam Bekleyen Tutar</p>
              <p className="text-2xl font-bold text-white">
                ₺{pendingPayments.reduce((sum, p) => sum + p.amount + p.fee, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-400 font-bold text-sm">₺</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Bugün İşlenen</p>
              <p className="text-2xl font-bold text-emerald-400">
                {processedPayments.filter(p => 
                  new Date(p.processedAt || '').toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Pending Payments */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 mb-8">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Clock className="h-5 w-5 mr-2 text-yellow-400" />
            Onay Bekleyen Ödemeler
          </h2>
        </div>
        
        <div className="p-6">
          {pendingPayments.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Bekleyen ödeme bulunmuyor</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-slate-900/50 rounded-xl border border-slate-700/30 p-6 hover:border-slate-600/50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{payment.username}</h3>
                        <p className="text-slate-400 text-sm">
                          {payment.serviceName} • {payment.bankName}
                        </p>
                        <p className="text-slate-500 text-xs">
                          {formatDate(payment.createdAt)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-white font-semibold text-lg">
                          ₺{payment.amount.toLocaleString()}
                        </p>
                        <p className="text-slate-400 text-sm">
                          +₺{payment.fee} ücret
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => showDetails(payment)}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                          title="Detayları Gör"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleApprove(payment.id)}
                          className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors"
                          title="Onayla"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleReject(payment.id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                          title="Reddet"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Processed Payments */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white">İşlenmiş Ödemeler</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Servis
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  İşlem Tarihi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {processedPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-medium text-xs">
                          {payment.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-white">{payment.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-white">
                      ₺{payment.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">
                      +₺{payment.fee} ücret
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{payment.serviceName}</div>
                    <div className="text-xs text-slate-400">{payment.bankName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {getStatusText(payment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {payment.processedAt ? formatDate(payment.processedAt) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => showDetails(payment)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-white mb-6">Ödeme Detayları</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Kullanıcı</span>
                <span className="text-white font-medium">{selectedPayment.username}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Transfer Tutarı</span>
                <span className="text-white font-semibold">₺{selectedPayment.amount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">İşlem Ücreti</span>
                <span className="text-white">₺{selectedPayment.fee}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Toplam Tutar</span>
                <span className="text-emerald-400 font-bold">
                  ₺{(selectedPayment.amount + selectedPayment.fee).toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Servis</span>
                <span className="text-white">{selectedPayment.serviceName}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Banka</span>
                <span className="text-white">{selectedPayment.bankName}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Hesap Sahibi</span>
                <span className="text-white">{selectedPayment.accountName}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Hesap No</span>
                <span className="text-white font-mono text-sm">
                  {selectedPayment.accountNumber.replace(/(.{4})/g, '$1 ').trim()}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Durum</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPayment.status)}`}>
                  {getStatusText(selectedPayment.status)}
                </span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-slate-400">Talep Tarihi</span>
                <span className="text-white text-sm">{formatDate(selectedPayment.createdAt)}</span>
              </div>
              
              {selectedPayment.processedAt && (
                <div className="flex justify-between py-2 border-b border-slate-700">
                  <span className="text-slate-400">İşlem Tarihi</span>
                  <span className="text-white text-sm">{formatDate(selectedPayment.processedAt)}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-3 pt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
              >
                Kapat
              </button>
              
              {selectedPayment.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleReject(selectedPayment.id);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200"
                  >
                    Reddet
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedPayment.id);
                      setShowDetailModal(false);
                    }}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200"
                  >
                    Onayla
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PendingPayments;
import React, { useState } from 'react';
import { User } from '../../App';
import AdminNavbar from './AdminNavbar';
import AccountManagement from './AccountManagement';
import PendingPayments from './PendingPayments';
import PaymentStatistics from './PaymentStatistics';

interface AdminPanelProps {
  user: User;
  onLogout: () => void;
  onViewChange: (view: 'dashboard' | 'admin') => void;
}

function AdminPanel({ user, onLogout, onViewChange }: AdminPanelProps) {
  const [currentView, setCurrentView] = useState<'accounts' | 'pending' | 'statistics'>('accounts');

  return (
    <div className="min-h-screen">
      <AdminNavbar 
        user={user}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
        onDashboard={() => onViewChange('dashboard')}
      />
      <div className="pt-16">
        {currentView === 'accounts' && <AccountManagement />}
        {currentView === 'pending' && <PendingPayments />}
        {currentView === 'statistics' && <PaymentStatistics />}
      </div>
    </div>
  );
}

export default AdminPanel;
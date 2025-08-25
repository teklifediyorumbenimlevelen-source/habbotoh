import React, { useState } from 'react';
import { User } from '../../App';
import Navbar from './Navbar';
import DashboardHome from './DashboardHome';
import TransferMoney from './TransferMoney';
import TransactionHistory from './TransactionHistory';
import Profile from './Profile';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onViewChange: (view: 'dashboard' | 'admin') => void;
}

function Dashboard({ user, onLogout, onViewChange }: DashboardProps) {
  const [currentView, setCurrentView] = useState<'home' | 'transfer' | 'history' | 'profile'>('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user} 
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
        onAdminPanel={() => onViewChange('admin')}
      />
      <div className="pt-20">
        {currentView === 'home' && <DashboardHome user={user} />}
        {currentView === 'transfer' && <TransferMoney user={user} />}
        {currentView === 'history' && <TransactionHistory user={user} />}
        {currentView === 'profile' && <Profile user={user} />}
      </div>
    </div>
  );
}

export default Dashboard;
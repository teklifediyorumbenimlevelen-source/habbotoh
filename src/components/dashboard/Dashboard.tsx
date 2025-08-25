import React, { useState } from 'react';
import { User } from '../../App';
import Navbar from './Navbar';
import DashboardHome from './DashboardHome';
import TransferMoney from './TransferMoney';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onViewChange: (view: 'dashboard' | 'admin') => void;
}

function Dashboard({ user, onLogout, onViewChange }: DashboardProps) {
  const [currentView, setCurrentView] = useState<'home' | 'transfer'>('home');

  return (
    <div className="min-h-screen">
      <Navbar 
        user={user} 
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
        onAdminPanel={() => onViewChange('admin')}
      />
      <div className="pt-16">
        {currentView === 'home' ? (
          <DashboardHome user={user} />
        ) : (
          <TransferMoney user={user} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
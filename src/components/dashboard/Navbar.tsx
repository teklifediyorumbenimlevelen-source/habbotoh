import React from 'react';
import { CreditCard, Home, ArrowLeftRight, LogOut, Settings } from 'lucide-react';
import { User } from '../../App';

interface NavbarProps {
  user: User;
  currentView: 'home' | 'transfer';
  onViewChange: (view: 'home' | 'transfer') => void;
  onLogout: () => void;
  onAdminPanel: () => void;
}

function Navbar({ user, currentView, onViewChange, onLogout, onAdminPanel }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              PayFlow Pro
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onViewChange('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'home'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Ana Sayfa</span>
            </button>
            
            <button
              onClick={() => onViewChange('transfer')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'transfer'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ArrowLeftRight className="h-4 w-4" />
              <span>Para Transferi</span>
            </button>

            {user.role === 'admin' && (
              <button
                onClick={onAdminPanel}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
              >
                <Settings className="h-4 w-4" />
                <span>Admin Panel</span>
              </button>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-white">{user.username}</p>
              <p className="text-xs text-slate-400">{user.role === 'admin' ? 'Yönetici' : 'Kullanıcı'}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Çıkış</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
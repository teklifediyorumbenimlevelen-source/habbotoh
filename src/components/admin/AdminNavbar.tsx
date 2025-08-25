import React from 'react';
import { Shield, Database, Clock, BarChart3, LogOut, Home } from 'lucide-react';
import { User } from '../../App';

interface AdminNavbarProps {
  user: User;
  currentView: 'accounts' | 'pending' | 'statistics';
  onViewChange: (view: 'accounts' | 'pending' | 'statistics') => void;
  onLogout: () => void;
  onDashboard: () => void;
}

function AdminNavbar({ user, currentView, onViewChange, onLogout, onDashboard }: AdminNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">Admin Panel</span>
              <div className="text-xs text-slate-400">PayFlow Pro</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange('accounts')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'accounts'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Database className="h-4 w-4" />
              <span>Hesap Yönetimi</span>
            </button>
            
            <button
              onClick={() => onViewChange('pending')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'pending'
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Bekleyen Ödemeler</span>
            </button>

            <button
              onClick={() => onViewChange('statistics')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'statistics'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>İstatistikler</span>
            </button>

            <button
              onClick={onDashboard}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-white">{user.username}</p>
              <p className="text-xs text-red-400">Admin</p>
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

export default AdminNavbar;
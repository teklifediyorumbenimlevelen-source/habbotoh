import React, { useState } from 'react';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import AdminPanel from './components/admin/AdminPanel';

export type User = {
  id: string;
  username: string;
  role: 'user' | 'admin';
};

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'admin'>('dashboard');

  const handleLogin = (username: string, role: 'user' | 'admin') => {
    setCurrentUser({
      id: Math.random().toString(36).substr(2, 9),
      username,
      role
    });
    setCurrentView(role === 'admin' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {currentView === 'admin' ? (
        <AdminPanel user={currentUser} onLogout={handleLogout} onViewChange={setCurrentView} />
      ) : (
        <Dashboard user={currentUser} onLogout={handleLogout} onViewChange={setCurrentView} />
      )}
    </div>
  );
}

export default App;
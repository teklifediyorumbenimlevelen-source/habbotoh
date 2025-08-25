import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import AdminPanel from './components/admin/AdminPanel';
import LoadingScreen from './components/ui/LoadingScreen';

export type User = {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  balance: number;
  verified: boolean;
};

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'admin'>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (username: string, role: 'user' | 'admin') => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email: `${username}@payflow.com`,
      role,
      balance: Math.floor(Math.random() * 50000) + 10000,
      verified: true,
      avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000) + 1500000000000}?w=150&h=150&fit=crop&crop=face`
    };
    setCurrentUser(user);
    setCurrentView(role === 'admin' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '12px',
            border: '1px solid #374151'
          }
        }}
      />
      {currentView === 'admin' ? (
        <AdminPanel user={currentUser} onLogout={handleLogout} onViewChange={setCurrentView} />
      ) : (
        <Dashboard user={currentUser} onLogout={handleLogout} onViewChange={setCurrentView} />
      )}
    </div>
  );
}

export default App;
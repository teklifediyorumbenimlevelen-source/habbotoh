import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthForm } from './AuthForm';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Shield, 
  Users, 
  Trophy, 
  Star, 
  Crown,
  LogIn,
  UserPlus,
  ChevronDown,
  ExternalLink,
  Award,
  Target,
  Zap
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { authAPI } from '../../services/api';

const founders = [
  {
    id: '1',
    name: 'Oyuncu943',
    position: 'As Kurucu',
    rank: 'A',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    description: 'TÖH\'ün kurucusu ve lideri'
  },
  {
    id: '2',
    name: '-Emobrinee',
    position: '1. Kurucu',
    rank: '1',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    description: 'Birinci kurucu ve stratejist'
  },
  {
    id: '3',
    name: 'Volkanmontana',
    position: '2. Kurucu',
    rank: '2',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    description: 'İkinci kurucu ve operasyon uzmanı'
  },
  {
    id: '4',
    name: 'Aybora2342',
    position: '3. Kurucu',
    rank: '3',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    description: 'Üçüncü kurucu ve teknoloji lideri'
  }
];

const features = [
  {
    icon: Shield,
    title: 'Güvenlik',
    description: 'En yüksek güvenlik standartları ile korunan sistem'
  },
  {
    icon: Users,
    title: 'Ekip Yönetimi',
    description: 'Kapsamlı personel ve terfi yönetim sistemi'
  },
  {
    icon: Trophy,
    title: 'Başarı Takibi',
    description: 'Detaylı performans ve başarı izleme'
  },
  {
    icon: Target,
    title: 'Hedef Odaklı',
    description: 'Şirket hedeflerine ulaşmak için optimize edilmiş'
  }
];

const stats = [
  { label: 'Aktif Üye', value: '150+', icon: Users },
  { label: 'Başarılı Operasyon', value: '500+', icon: Target },
  { label: 'Yıllık Deneyim', value: '5+', icon: Award },
  { label: 'Memnuniyet', value: '%98', icon: Star }
];

export function WelcomeScreen() {
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const { setUser, setAuthenticated } = useAppStore();

  const handleAuthSubmit = (userData: any) => {
    authAPI.setCurrentUser(userData);
    setUser(userData);
    setAuthenticated(true);
  };

  const toggleAuthType = () => {
    setAuthType(authType === 'login' ? 'register' : 'login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-red-500/5 to-transparent rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                TÖH
              </h1>
              <p className="text-xs text-gray-400">Türkiye Özel Harekat</p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              onClick={() => {
                setAuthType('login');
                setShowAuth(true);
              }}
              variant="ghost"
              icon={LogIn}
              className="text-white hover:bg-white/10"
            >
              Giriş Yap
            </Button>
            <Button
              onClick={() => {
                setAuthType('register');
                setShowAuth(true);
              }}
              icon={UserPlus}
              className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600"
            >
              TÖH'e Katıl
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-600 bg-clip-text text-transparent">
                TÖH
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Türkiye Özel Harekat
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => {
                setAuthType('register');
                setShowAuth(true);
              }}
              size="lg"
              icon={UserPlus}
              className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-lg px-8 py-4"
            >
              Hemen Başla
            </Button>
            <Button
              onClick={() => {
                document.getElementById('founders')?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="outline"
              size="lg"
              icon={ChevronDown}
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              Daha Fazla Bilgi
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/10">
                <stat.icon className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Founders Section */}
      <div id="founders" className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Kurucularımız
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            TÖH'ü kuran ve bugünlere getiren vizyoner liderlerimiz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 text-center hover:scale-105 transition-all duration-300 bg-white/5 backdrop-blur-sm border-white/10">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-gradient-to-r from-orange-500 to-red-500 p-1">
                    <img
                      src={founder.avatar}
                      alt={founder.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{founder.name}</h3>
                <p className="text-orange-400 font-semibold mb-2">{founder.position}</p>
                <p className="text-gray-400 text-sm">{founder.description}</p>
                
                <div className="mt-4 flex justify-center">
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full text-orange-400 text-sm font-medium border border-orange-500/30">
                    Rank {founder.rank}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Neden TÖH?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Modern teknoloji ve profesyonel yaklaşımımızla fark yaratıyoruz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 text-center h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-12 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm border-orange-500/20">
            <Zap className="w-16 h-16 text-orange-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              TÖH Ailesine Katıl
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Profesyonel ekibimizin bir parçası ol ve Habbo Türkiye'deki 
              en prestijli şirkette kariyerini şekillendir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  setAuthType('register');
                  setShowAuth(true);
                }}
                size="lg"
                icon={UserPlus}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8 py-4"
              >
                Şimdi Başvur
              </Button>
              <Button
                onClick={() => window.open('https://habbo.com.tr', '_blank')}
                variant="outline"
                size="lg"
                icon={ExternalLink}
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                Habbo'ya Git
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && setShowAuth(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md"
            >
              <Card className="p-8 bg-white dark:bg-gray-800">
                <AuthForm
                  type={authType}
                  onSubmit={handleAuthSubmit}
                  onToggle={toggleAuthType}
                />
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold">TÖH - Türkiye Özel Harekat</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 TÖH. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
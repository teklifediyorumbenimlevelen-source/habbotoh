import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  TrendingUp, 
  DollarSign, 
  Users, 
  CreditCard, 
  GraduationCap,
  UserPlus,
  UserMinus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const menuItems = [
  { id: 'dashboard', label: 'Genel Bakış', icon: LayoutDashboard },
  { id: 'promotion', label: 'Terfi', icon: TrendingUp },
  { id: 'salary', label: 'Maaş Rozeti', icon: DollarSign },
  { id: 'bulk-promotion', label: 'Toplu Terfi', icon: Users },
  { id: 'license', label: 'Lisans', icon: CreditCard },
  { id: 'education', label: 'Eğitim', icon: GraduationCap },
  { id: 'transfer-in', label: 'Transfer Gelen', icon: UserPlus },
  { id: 'transfer-out', label: 'Şirketten Giden', icon: UserMinus },
];

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed, currentPage, setCurrentPage } = useAppStore();

  return (
    <motion.div
      className={`
        fixed left-0 top-0 h-full bg-gray-900 text-white shadow-2xl z-40
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
      `}
      animate={{ width: sidebarCollapsed ? 64 : 256 }}
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-700">
        <motion.h2
          className="text-xl font-bold text-red-500"
          animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
        >
          {!sidebarCollapsed && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              TÖH Yönetim
            </span>
          )}
        </motion.h2>
        
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`
                w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
                ${currentPage === item.id 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              
              <motion.span
                className="ml-3 text-sm font-medium"
                animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
              >
                {!sidebarCollapsed && item.label}
              </motion.span>
            </motion.button>
          ))}
        </div>
      </nav>
    </motion.div>
  );
}
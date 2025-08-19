import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { StatsGrid } from './StatsGrid';
import { PromotionForm } from './PromotionForm';
import { SalaryForm } from './SalaryForm';
import { BulkPromotionForm } from './BulkPromotionForm';
import { LicenseForm } from './LicenseForm';
import { EducationForm } from './EducationForm';
import { TransferInForm } from './TransferInForm';
import { TransferOutForm } from './TransferOutForm';
import { useAppStore } from '../../store/useAppStore';

export function Dashboard() {
  const { currentPage, sidebarCollapsed } = useAppStore();

  const renderContent = () => {
    switch (currentPage) {
      case 'promotion':
        return <PromotionForm />;
      case 'salary':
        return <SalaryForm />;
      case 'bulk-promotion':
        return <BulkPromotionForm />;
      case 'license':
        return <LicenseForm />;
      case 'education':
        return <EducationForm />;
      case 'transfer-in':
        return <TransferInForm />;
      case 'transfer-out':
        return <TransferOutForm />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-8">
            <StatsGrid />
            {/* Add more dashboard content here */}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Header />
      
      <motion.main
        className={`
          pt-20 transition-all duration-300
          ${sidebarCollapsed ? 'ml-16' : 'ml-64'}
        `}
        animate={{ marginLeft: sidebarCollapsed ? 64 : 256 }}
      >
        <div className="p-6">
          {renderContent()}
        </div>
      </motion.main>
    </div>
  );
}
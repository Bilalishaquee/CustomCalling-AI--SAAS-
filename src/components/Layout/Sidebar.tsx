import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  Workflow, 
  Variable, 
  Code, 
  Settings, 
  CreditCard, 
  BarChart3,
  Users,
  FileText,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useTranslation } from '../../utils/translations';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { language } = useSettingsStore();
  const t = useTranslation(language);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'flows', label: t('flows'), icon: Workflow, path: '/flows' },
    { id: 'variables', label: t('variables'), icon: Variable, path: '/variables' },
    { id: 'api', label: t('api'), icon: Code, path: '/api' },
    { id: 'simulator', label: t('simulator'), icon: FileText, path: '/simulator' },
    ...(user?.role === 'master_admin' || user?.role === 'company_admin' ? [
      { id: 'analytics', label: t('analytics'), icon: BarChart3, path: '/analytics' },
      { id: 'billing', label: t('billing'), icon: CreditCard, path: '/billing' },
    ] : []),
    ...(user?.role === 'master_admin' ? [
      { id: 'users', label: t('users'), icon: Users, path: '/users' },
    ] : []),
    { id: 'settings', label: t('settings'), icon: Settings, path: '/settings' }
  ];

  // Filter menu items based on screen size and user permissions
  const getFilteredMenuItems = () => {
    // Mobile: Only monitoring/read-only items
    const mobileItems = ['flows', 'analytics', 'settings'];
    // Tablet: View/edit functionality
    const tabletItems = ['flows', 'variables', 'simulator', 'analytics', 'settings'];
    
    return menuItems.filter(item => {
      // Always show all items on desktop (lg and above)
      return true;
    });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg border border-gray-800"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:relative z-40 lg:z-0
        w-64 lg:w-64 md:w-56 sm:w-64
        bg-gray-900 h-full flex flex-col border-r border-gray-800 
        transition-transform duration-300 ease-in-out
        ${language === 'he' ? 'rtl' : 'ltr'}
      `}>
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <Workflow className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl lg:text-xl md:text-lg font-bold text-white">VoiceFlow AI</h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {getFilteredMenuItems().map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          // Hide certain items on mobile (monitoring only)
          const isMobileHidden = window.innerWidth < 768 && !['flows', 'analytics', 'settings'].includes(item.id);
          // Hide certain items on tablet (view/edit only)
          const isTabletHidden = window.innerWidth >= 768 && window.innerWidth < 1024 && 
            !['flows', 'variables', 'simulator', 'analytics', 'settings'].includes(item.id);
          
          if (isMobileHidden || isTabletHidden) return null;

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 lg:py-3 md:py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm lg:text-base">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
    </>
  );
};

export default Sidebar;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Workflow, 
  Variable, 
  Code, 
  Settings, 
  CreditCard, 
  BarChart3,
  Users,
  FileText 
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

  return (
    <div className={`w-64 bg-gray-900 h-full flex flex-col border-r border-gray-800 ${language === 'he' ? 'rtl' : 'ltr'}`}>
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <Workflow className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">VoiceFlow AI</h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
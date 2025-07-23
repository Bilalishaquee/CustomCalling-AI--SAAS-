import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Save,
  Moon,
  Sun,
  Mail,
  Smartphone,
  MessageSquare,
  Eye,
  EyeOff
} from 'lucide-react';
import { useSettingsStore, Theme, Language } from '../store/settingsStore';
import { useTranslation } from '../utils/translations';
import { useAuthStore } from '../store/authStore';

const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    theme, 
    language, 
    notifications, 
    privacy, 
    setTheme, 
    setLanguage, 
    updateNotifications, 
    updatePrivacy 
  } = useSettingsStore();
  
  const t = useTranslation(language);
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'account', label: t('account'), icon: User },
    { id: 'appearance', label: t('appearance'), icon: Palette },
    { id: 'notifications', label: t('notifications'), icon: Bell },
    { id: 'privacy', label: t('privacy'), icon: Shield },
  ];

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: t('english'), flag: '🇺🇸' },
    { code: 'es', name: t('spanish'), flag: '🇪🇸' },
    { code: 'he', name: t('hebrew'), flag: '🇮🇱' },
  ];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className={`h-full overflow-y-auto ${language === 'he' ? 'rtl' : 'ltr'}`}>
      <div className="bg-gray-950 dark:bg-gray-950 light:bg-gray-50 min-h-full">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
              {t('settings')}
            </h1>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-gray-900 dark:bg-gray-900 light:bg-white rounded-lg border border-gray-800 dark:border-gray-800 light:border-gray-200">
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-teal-600 text-white'
                          : 'text-gray-300 dark:text-gray-300 light:text-gray-700 hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-gray-100 hover:text-white dark:hover:text-white light:hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 bg-gray-900 dark:bg-gray-900 light:bg-white rounded-lg border border-gray-800 dark:border-gray-800 light:border-gray-200">
              <div className="p-6">
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                        Account Information
                      </h2>
                    </div>

                    {/* Profile Picture */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                        alt={user?.name}
                        className="w-20 h-20 rounded-full"
                      />
                      <div>
                        <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                          Change Photo
                        </button>
                        <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1">
                          JPG, GIF or PNG. 1MB max.
                        </p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={user?.name || ''}
                          className="w-full px-3 py-2 bg-gray-800 dark:bg-gray-800 light:bg-gray-50 border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                          {t('email')}
                        </label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full px-3 py-2 bg-gray-800 dark:bg-gray-800 light:bg-gray-50 border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                          Role
                        </label>
                        <input
                          type="text"
                          value={user?.role?.replace('_', ' ') || ''}
                          disabled
                          className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-700 light:bg-gray-100 border border-gray-600 dark:border-gray-600 light:border-gray-200 rounded-lg text-gray-400 dark:text-gray-400 light:text-gray-500 cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value="Acme Corp"
                          disabled
                          className="w-full px-3 py-2 bg-gray-700 dark:bg-gray-700 light:bg-gray-100 border border-gray-600 dark:border-gray-600 light:border-gray-200 rounded-lg text-gray-400 dark:text-gray-400 light:text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Password Change */}
                    <div className="border-t border-gray-800 dark:border-gray-800 light:border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mb-4">
                        Change Password
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="w-full px-3 py-2 bg-gray-800 dark:bg-gray-800 light:bg-gray-50 border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white dark:hover:text-white light:hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 bg-gray-800 dark:bg-gray-800 light:bg-gray-50 border border-gray-700 dark:border-gray-700 light:border-gray-300 rounded-lg text-white dark:text-white light:text-gray-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button className="flex items-center space-x-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                        <Save className="w-4 h-4" />
                        <span>{t('save')}</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                        {t('appearance')}
                      </h2>
                    </div>

                    {/* Theme Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mb-4">
                        Theme
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => handleThemeChange('dark')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'dark'
                              ? 'border-teal-600 bg-teal-600 bg-opacity-10'
                              : 'border-gray-700 dark:border-gray-700 light:border-gray-300 hover:border-gray-600 dark:hover:border-gray-600 light:hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                              <Moon className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-medium text-white dark:text-white light:text-gray-900">
                                {t('darkMode')}
                              </div>
                              <div className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                                Dark theme for low-light environments
                              </div>
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handleThemeChange('light')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'light'
                              ? 'border-teal-600 bg-teal-600 bg-opacity-10'
                              : 'border-gray-700 dark:border-gray-700 light:border-gray-300 hover:border-gray-600 dark:hover:border-gray-600 light:hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Sun className="w-6 h-6 text-gray-900" />
                            </div>
                            <div className="text-left">
                              <div className="font-medium text-white dark:text-white light:text-gray-900">
                                {t('lightMode')}
                              </div>
                              <div className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                                Light theme for bright environments
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Language Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mb-4">
                        {t('language')}
                      </h3>
                      <div className="space-y-3">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                              language === lang.code
                                ? 'border-teal-600 bg-teal-600 bg-opacity-10'
                                : 'border-gray-700 dark:border-gray-700 light:border-gray-300 hover:border-gray-600 dark:hover:border-gray-600 light:hover:border-gray-400'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{lang.flag}</span>
                              <span className="font-medium text-white dark:text-white light:text-gray-900">
                                {lang.name}
                              </span>
                            </div>
                            {language === lang.code && (
                              <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                        {t('notifications')}
                      </h2>
                    </div>

                    <div className="space-y-6">
                      {/* Email Notifications */}
                      <div className="flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-800 light:bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-teal-500" />
                          <div>
                            <div className="font-medium text-white dark:text-white light:text-gray-900">
                              {t('emailNotifications')}
                            </div>
                            <div className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                              Receive notifications via email
                            </div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={(e) => updateNotifications({ email: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        </label>
                      </div>

                      {/* Push Notifications */}
                      <div className="flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-800 light:bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="w-5 h-5 text-teal-500" />
                          <div>
                            <div className="font-medium text-white dark:text-white light:text-gray-900">
                              {t('pushNotifications')}
                            </div>
                            <div className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                              Receive push notifications on your device
                            </div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.push}
                            onChange={(e) => updateNotifications({ push: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        </label>
                      </div>

                      {/* SMS Notifications */}
                      <div className="flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-800 light:bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MessageSquare className="w-5 h-5 text-teal-500" />
                          <div>
                            <div className="font-medium text-white dark:text-white light:text-gray-900">
                              {t('smsNotifications')}
                            </div>
                            <div className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                              Receive notifications via SMS
                            </div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.sms}
                            onChange={(e) => updateNotifications({ sms: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-4">
                        {t('privacy')}
                      </h2>
                    </div>

                    <div className="space-y-6">
                      {/* Analytics */}
                      <div className="flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-800 light:bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-white dark:text-white light:text-gray-900 mb-1">
                            Analytics & Performance
                          </div>
                          <div className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                            Help improve our service by sharing usage analytics
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacy.analytics}
                            onChange={(e) => updatePrivacy({ analytics: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        </label>
                      </div>

                      {/* Marketing */}
                      <div className="flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-800 light:bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-white dark:text-white light:text-gray-900 mb-1">
                            Marketing Communications
                          </div>
                          <div className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                            Receive marketing emails about new features and updates
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacy.marketing}
                            onChange={(e) => updatePrivacy({ marketing: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        </label>
                      </div>
                    </div>

                    {/* Data Export */}
                    <div className="border-t border-gray-800 dark:border-gray-800 light:border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-white dark:text-white light:text-gray-900 mb-4">
                        Data Management
                      </h3>
                      <div className="space-y-4">
                        <button className="w-full flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-800 light:bg-gray-50 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700 light:hover:bg-gray-100 transition-colors">
                          <div className="text-left">
                            <div className="font-medium text-white dark:text-white light:text-gray-900">
                              Export Data
                            </div>
                            <div className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
                              Download a copy of your data
                            </div>
                          </div>
                          <div className="text-teal-500">→</div>
                        </button>

                        <button className="w-full flex items-center justify-between p-4 bg-red-900 bg-opacity-20 border border-red-700 rounded-lg hover:bg-red-900 hover:bg-opacity-30 transition-colors">
                          <div className="text-left">
                            <div className="font-medium text-red-300">
                              Delete Account
                            </div>
                            <div className="text-sm text-red-400">
                              Permanently delete your account and all data
                            </div>
                          </div>
                          <div className="text-red-400">→</div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
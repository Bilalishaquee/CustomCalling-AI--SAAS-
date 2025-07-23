import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Eye, EyeOff, Loader, Shield } from 'lucide-react';

const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mfaCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!showMFA) {
        // First attempt - check if MFA is required
        if (formData.email && formData.password) {
          setShowMFA(true);
          return;
        }
      } else {
        // Second attempt with MFA
        await login(formData.email, formData.password, formData.mfaCode);
      }
    } catch (err) {
      setError('Invalid credentials or MFA code');
      setShowMFA(false);
    }
  };

  const handleDemoLogin = async (role: string) => {
    const demoCredentials = {
      admin: { email: 'admin@demo.com', password: 'demo123' },
      user: { email: 'user@demo.com', password: 'demo123' },
      viewer: { email: 'viewer@demo.com', password: 'demo123' }
    };

    const creds = demoCredentials[role as keyof typeof demoCredentials];
    setFormData({ ...creds, mfaCode: '123456' });
    
    try {
      await login(creds.email, creds.password, '123456');
    } catch (err) {
      setError('Demo login failed');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">VoiceFlow AI</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg text-red-100 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="Enter your email"
                required
                disabled={showMFA}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 pr-12"
                  placeholder="Enter your password"
                  required
                  disabled={showMFA}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  disabled={showMFA}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {showMFA && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  MFA Code
                </label>
                <input
                  type="text"
                  value={formData.mfaCode}
                  onChange={(e) => setFormData({ ...formData, mfaCode: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  For demo purposes, use: 123456
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 text-white font-medium rounded-lg transition-colors"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : showMFA ? (
                'Verify & Sign In'
              ) : (
                'Continue'
              )}
            </button>
          </form>

          {/* Demo Login Options */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-400 text-center mb-4">Demo Accounts</p>
            <div className="space-y-2">
              <button
                onClick={() => handleDemoLogin('admin')}
                className="w-full px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
              >
                Master Admin Demo
              </button>
              <button
                onClick={() => handleDemoLogin('user')}
                className="w-full px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
              >
                Company Admin Demo
              </button>
              <button
                onClick={() => handleDemoLogin('viewer')}
                className="w-full px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
              >
                Viewer Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
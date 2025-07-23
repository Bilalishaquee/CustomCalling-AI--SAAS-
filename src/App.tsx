import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import FlowsPage from './pages/FlowsPage';
import FlowBuilderPage from './pages/FlowBuilderPage';
import VariablesPage from './pages/VariablesPage';
import SimulatorPage from './pages/SimulatorPage';
import ApiPage from './pages/ApiPage';
import BillingPage from './pages/BillingPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import LoginForm from './components/Auth/LoginForm';
import { useSettingsStore } from './store/settingsStore';

function App() {
  const { isAuthenticated, setUser, setCompany } = useAuthStore();
  const { theme } = useSettingsStore();

  useEffect(() => {
    // Check for stored auth token and restore session
    const token = localStorage.getItem('auth-token');
    if (token) {
      // Mock user restoration - replace with actual API call
      const mockUser = {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        role: 'company_admin' as const,
        companyId: 'company-1',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        mfaEnabled: true
      };

      const mockCompany = {
        id: 'company-1',
        name: 'Demo Company',
        plan: 'pro' as const,
        credits: 1500,
        billingStatus: 'active' as const
      };

      setUser(mockUser);
      setCompany(mockCompany);
    }
  }, [setUser, setCompany]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/flows" replace />} />
          <Route path="flows" element={<FlowsPage />} />
          <Route path="flows/:id" element={<FlowBuilderPage />} />
          <Route path="variables" element={<VariablesPage />} />
          <Route path="api" element={<ApiPage />} />
          <Route path="simulator" element={<SimulatorPage />} />
          <Route path="analytics" element={
            <ProtectedRoute requiredRole="company_admin">
              <AnalyticsPage />
            </ProtectedRoute>
          } />
          <Route path="billing" element={
            <ProtectedRoute requiredRole="company_admin">
              <BillingPage />
            </ProtectedRoute>
          } />
          <Route path="users" element={
            <ProtectedRoute requiredRole="master_admin">
              <UsersPage />
            </ProtectedRoute>
          } />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
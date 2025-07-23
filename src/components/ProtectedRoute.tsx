import React from 'react';
import { useAuthStore } from '../store/authStore';
import LoginForm from './Auth/LoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'master_admin' | 'company_admin' | 'viewer';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  if (requiredRole) {
    const roleHierarchy = {
      viewer: 1,
      company_admin: 2,
      master_admin: 3
    };

    if (!user || roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-gray-400">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
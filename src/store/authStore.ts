import { create } from 'zustand';
import { User, Company } from '../types';

interface AuthState {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (email: string, password: string, mfaCode?: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setCompany: (company: Company) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  company: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,

  login: async (email: string, password: string, mfaCode?: string) => {
    set({ isLoading: true });
    
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email: email,
        name: 'John Doe',
        role: email.includes('admin') ? 'master_admin' : 'company_admin',
        companyId: 'company-1',
        avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150`,
        mfaEnabled: true
      };

      const mockCompany: Company = {
        id: 'company-1',
        name: 'Acme Corp',
        plan: 'pro',
        credits: 1500,
        billingStatus: 'active'
      };

      const mockToken = 'mock-jwt-token';

      set({
        user: mockUser,
        company: mockCompany,
        isAuthenticated: true,
        token: mockToken,
        isLoading: false
      });

      localStorage.setItem('auth-token', mockToken);
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('auth-token');
    set({
      user: null,
      company: null,
      isAuthenticated: false,
      token: null
    });
  },

  setUser: (user: User) => set({ user }),
  setCompany: (company: Company) => set({ company })
}));
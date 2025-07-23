import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'dark' | 'light';
export type Language = 'en' | 'es' | 'he';

interface SettingsState {
  theme: Theme;
  language: Language;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    analytics: boolean;
    marketing: boolean;
  };
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  updateNotifications: (notifications: Partial<SettingsState['notifications']>) => void;
  updatePrivacy: (privacy: Partial<SettingsState['privacy']>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      language: 'en',
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      privacy: {
        analytics: true,
        marketing: false,
      },
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      setLanguage: (language) => set({ language }),
      updateNotifications: (notifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications },
        })),
      updatePrivacy: (privacy) =>
        set((state) => ({
          privacy: { ...state.privacy, ...privacy },
        })),
    }),
    {
      name: 'settings-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme on app load
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }
  )
);
export type Language = 'en' | 'es' | 'he';

export const translations = {
  en: {
    // Navigation
    flows: 'Flows',
    variables: 'Variables',
    api: 'API',
    simulator: 'Simulator',
    analytics: 'Analytics',
    billing: 'Billing',
    users: 'Users',
    settings: 'Settings',
    
    // Users page
    totalUsers: 'Total Users',
    activeUsers: 'Active Users',
    companies: 'Companies',
    mfaEnabled: 'MFA Enabled',
    addUser: 'Add User',
    editUser: 'Edit User',
    deleteUser: 'Delete User',
    suspendUser: 'Suspend User',
    activateUser: 'Activate User',
    resetPassword: 'Reset Password',
    lastLogin: 'Last Login',
    userStatus: 'Status',
    userRole: 'Role',
    company: 'Company',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    loading: 'Loading...',
    
    // Auth
    login: 'Sign In',
    logout: 'Logout',
    email: 'Email Address',
    password: 'Password',
    mfaCode: 'MFA Code',
    
    // Settings
    appearance: 'Appearance',
    language: 'Language',
    notifications: 'Notifications',
    privacy: 'Privacy',
    account: 'Account',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    smsNotifications: 'SMS Notifications',
    
    // Analytics
    totalCalls: 'Total Calls',
    successRate: 'Success Rate',
    avgDuration: 'Avg Duration',
    activeFlows: 'Active Flows',
    callVolume: 'Call Volume',
    flowPerformance: 'Flow Performance',
    
    // Languages
    english: 'English',
    spanish: 'Spanish',
    hebrew: 'Hebrew',
  },
  es: {
    // Navigation
    flows: 'Flujos',
    variables: 'Variables',
    api: 'API',
    simulator: 'Simulador',
    analytics: 'Analíticas',
    billing: 'Facturación',
    users: 'Usuarios',
    settings: 'Configuración',
    
    // Users page
    totalUsers: 'Total de Usuarios',
    activeUsers: 'Usuarios Activos',
    companies: 'Empresas',
    mfaEnabled: 'MFA Habilitado',
    addUser: 'Agregar Usuario',
    editUser: 'Editar Usuario',
    deleteUser: 'Eliminar Usuario',
    suspendUser: 'Suspender Usuario',
    activateUser: 'Activar Usuario',
    resetPassword: 'Restablecer Contraseña',
    lastLogin: 'Último Acceso',
    userStatus: 'Estado',
    userRole: 'Rol',
    company: 'Empresa',
    
    // Common
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    create: 'Crear',
    search: 'Buscar',
    filter: 'Filtrar',
    loading: 'Cargando...',
    
    // Auth
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    mfaCode: 'Código MFA',
    
    // Settings
    appearance: 'Apariencia',
    language: 'Idioma',
    notifications: 'Notificaciones',
    privacy: 'Privacidad',
    account: 'Cuenta',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    emailNotifications: 'Notificaciones por Email',
    pushNotifications: 'Notificaciones Push',
    smsNotifications: 'Notificaciones SMS',
    
    // Analytics
    totalCalls: 'Llamadas Totales',
    successRate: 'Tasa de Éxito',
    avgDuration: 'Duración Promedio',
    activeFlows: 'Flujos Activos',
    callVolume: 'Volumen de Llamadas',
    flowPerformance: 'Rendimiento de Flujos',
    
    // Languages
    english: 'Inglés',
    spanish: 'Español',
    hebrew: 'Hebreo',
  },
  he: {
    // Navigation
    flows: 'זרימות',
    variables: 'משתנים',
    api: 'API',
    simulator: 'סימולטור',
    analytics: 'אנליטיקה',
    billing: 'חיוב',
    users: 'משתמשים',
    settings: 'הגדרות',
    
    // Users page
    totalUsers: 'סך המשתמשים',
    activeUsers: 'משתמשים פעילים',
    companies: 'חברות',
    mfaEnabled: 'MFA מופעל',
    addUser: 'הוסף משתמש',
    editUser: 'ערוך משתמש',
    deleteUser: 'מחק משתמש',
    suspendUser: 'השעה משתמש',
    activateUser: 'הפעל משתמש',
    resetPassword: 'איפוס סיסמה',
    lastLogin: 'כניסה אחרונה',
    userStatus: 'סטטוס',
    userRole: 'תפקיד',
    company: 'חברה',
    
    // Common
    save: 'שמור',
    cancel: 'בטל',
    delete: 'מחק',
    edit: 'ערוך',
    create: 'צור',
    search: 'חפש',
    filter: 'סנן',
    loading: 'טוען...',
    
    // Auth
    login: 'התחבר',
    logout: 'התנתק',
    email: 'כתובת אימייל',
    password: 'סיסמה',
    mfaCode: 'קוד MFA',
    
    // Settings
    appearance: 'מראה',
    language: 'שפה',
    notifications: 'התראות',
    privacy: 'פרטיות',
    account: 'חשבון',
    darkMode: 'מצב כהה',
    lightMode: 'מצב בהיר',
    emailNotifications: 'התראות אימייל',
    pushNotifications: 'התראות דחיפה',
    smsNotifications: 'התראות SMS',
    
    // Analytics
    totalCalls: 'סך השיחות',
    successRate: 'שיעור הצלחה',
    avgDuration: 'משך ממוצע',
    activeFlows: 'זרימות פעילות',
    callVolume: 'נפח שיחות',
    flowPerformance: 'ביצועי זרימות',
    
    // Languages
    english: 'אנגלית',
    spanish: 'ספרדית',
    hebrew: 'עברית',
  },
};

export const useTranslation = (language: Language) => {
  return (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };
};
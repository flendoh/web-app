export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  children?: RouteConfig[];
}

export const ROUTES = {
  HOME: '/',
  
  IAM: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  PROFILE: {
    BASE: '/profile',
    VIEW: '/profile',
    EDIT: '/profile/edit',
    SETTINGS: '/profile/settings',
  },
  
  REPORT: {
    BASE: '/reports',
    LIST: '/reports',
    CREATE: '/reports/create',
    VIEW: '/reports/:id',
    EDIT: '/reports/:id/edit',
  },
  
  RIDE: {
    BASE: '/rides',
    LIST: '/rides',
    REQUEST: '/rides/request',
    VIEW: '/rides/:id',
    HISTORY: '/rides/history',
  },
} as const;

export type AppRoutes = typeof ROUTES;
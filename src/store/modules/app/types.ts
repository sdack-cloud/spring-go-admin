import type { RouteRecordNormalized } from 'vue-router';

export interface AppState {
  theme: string;
  colorWeak: boolean;
  navbar: boolean;
  menu: boolean;
  topMenu: boolean;
  hideMenu: boolean;
  menuCollapse: boolean;
  footer: boolean;
  themeColor: string;
  menuWidth: number;
  globalSettings: boolean;
  device: string;
  tabBar: boolean;
  menuFromServer: boolean;
  serverMenu: RouteRecordNormalized[];
  authHost: string; // 授权地址
  clientId: string; // 客户端ID
  basic: string; // Basic key
  authRedirect: string; // 授权重定向地址
  authLink: string; // 授权码链接
  [key: string]: unknown;
}

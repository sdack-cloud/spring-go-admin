import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '系统管理',
    icon: 'icon-settings',
    requiresAuth: true,
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        locale: '用户列表',
        requiresAuth: true,
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        locale: '系统角色',
        requiresAuth: true,
      },
    },
    {
      path: 'authority',
      name: 'Authority',
      component: () => import('@/views/system/authority/index.vue'),
      meta: {
        locale: '系统权限',
        requiresAuth: true,
      },
    },
    {
      path: 'group',
      name: 'Group',
      component: () => import('@/views/system/group/index.vue'),
      meta: {
        locale: '组织团体',
        requiresAuth: true,
      },
    },
  ],
};

export default SYSTEM;

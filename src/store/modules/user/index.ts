import { defineStore } from 'pinia';
import {
  login as userLogin,
  oauthToken,
  logout as userLogout,
  getUserInfo,
  LoginData, TokenData,
} from '@/api/user';
import {setToken, clearToken, setRefreshToken} from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();

      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    async loginToken(code:string) {
      const appStore = useAppStore();
      try {
        const res = await oauthToken({code,host:appStore.authHost,basic:appStore.basic,client:appStore.clientId,redirect:appStore.authRedirect} as TokenData);
        setToken(res.access_token);
        setRefreshToken(res.refresh_token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      const appStore = useAppStore();
      try {
        await userLogout(appStore.authHost,appStore.basic);
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;

import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore,useAppStore } from '@/store';
import { isLogin } from '@/utils/auth';

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    console.warn('setupUserLoginInfoGuard');
    NProgress.start();
    const userStore = useUserStore();
    const appStore = useAppStore();

    if (isLogin()) {
      if (userStore.role) {
        next();
      } else {
        try {
          await userStore.info();
          next();
        } catch (error) {
          userStore.logout();
          next({
            name: 'logout',
          });
        }
      }
    } else {
      if (to.name === 'logout' || to.name === 'notFound' || to.name === 'redirectWrapper') {
        next();
        return;
      }
      if (to.path === '/dashboard/index' && to.query.code && to.query.code.length) {
        await userStore.loginToken(to.query.code);
        next();
        return;
      }
      window.location.href = appStore.authLink;
      // if (to.name === 'login') {
      //   next();
      //   return;
      // }
      // next({
      //   name: 'login',
      //   query: {
      //     redirect: to.name,
      //     ...to.query,
      //   } as LocationQueryRaw,
      // });
    }
  });
}

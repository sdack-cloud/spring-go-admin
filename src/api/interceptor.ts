import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import {getRefreshToken, getToken,setToken,setRefreshToken} from '@/utils/auth';
import qs from 'qs';
import { useAppStore } from '@/store';


export interface HttpResponse<T = unknown> {
  error: string;
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  async (response: AxiosResponse<HttpResponse>) => {
    const status = response.status as number;
    const res = response.data;
    if (status === 200) {
        if (res.error) {
            return Promise.reject(new Error(res.error || 'Error'));
        }
        const appStore = useAppStore();
        if (response.config.url!.indexOf(appStore.authHost) >= 0) {
            return res;
        }
        // TODO 你自己的业务逻辑处理



    }
      return res;
  },
  async (error) => {
      const response = error.response as AxiosResponse<HttpResponse>;
      if (response.status === 401) {
          const appStore = useAppStore();
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
              window.location.href = appStore.authLink;
          } else {
              const refreshResponse = await axios.request({
                  url: `${appStore.authHost}/oauth2/token`,
                  method: 'POST',
                  headers:{'Content-Type':'application/x-www-form-urlencoded','Authorization': `Basic ${appStore.basic}`},
                  data:  qs.stringify({'refresh_token':refreshToken,'grant_type':'refresh_token','scope':'openid profile'})
              });
              if (refreshResponse.error) {
                  window.location.href = appStore.authLink;
              } else {
                  setToken(refreshResponse.access_token);
                  setRefreshToken(refreshResponse.refresh_token);
                  const config = response.config as AxiosRequestConfig;
                  config.headers.Authorization = `Bearer ${refreshResponse.access_token}`;
                  const req = await axios.request(config);
                  return Promise.resolve(req);
              }
          }
      }

      Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

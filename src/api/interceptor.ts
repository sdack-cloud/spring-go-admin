import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import {getRefreshToken, getToken} from '@/utils/auth';
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
        // TODO 你自己的业务逻辑处理

    }
    if (status === 401) {
        const appStore = useAppStore();
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
              window.location.href = appStore.authLink;
          } else {
              const response1 = await axios.request({
                  url: appStore.authHost,
                  method: 'POST',
                  headers:{'Content-Type':'application/x-www-form-urlencoded','Authorization': `Basic ${appStore.basic}`},
                  data:  qs.stringify({'refresh_token':refreshToken,'grant_type':'refresh_token','scope':'profile'})
              });
              if (response1.status !== 200) {
                  window.location.href = appStore.authLink;
              } else if (response1.data.error) {
                  window.location.href = appStore.authLink;
              } else {
                  setToken(response1.data.access_token);
                  setRefreshToken(response1.data.refresh_token);
                  const config = response.config as AxiosRequestConfig;
                  config.headers.Authorization = `Bearer ${response1.data.access_token}`;
                  return axios.request(config);
              }
          }
      }
      return res;
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

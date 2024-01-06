import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import qs from 'qs';
import {getRefreshToken, getToken} from '@/utils/auth';


export interface LoginData {
  username: string;
  password: string;
}
export interface TokenData {
  code: string;
  host: string;
  redirect: string;
  client: string;
  codeVerifier: string;
  basic: string;
}

export interface LoginRes {
  token: string;
}
export interface TokenRes {
  error: string;
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}

export function oauthToken(data: TokenData) {
  return axios.post<string>(`${data.host}/oauth2/token`
      , qs.stringify({'code': data.code,'redirect_uri': data.redirect,'client_id' : data.client,'grant_type':'authorization_code','scope':'profile'}),{headers:{'Content-Type':'application/x-www-form-urlencoded','Authorization': `Basic ${data.basic}`}});
}

export function logout(host:string,basic : string) {
  const refreshToken = getRefreshToken();
  if (refreshToken && refreshToken.length) {
    return axios.post<LoginRes>(`${host}/oauth2/revoke`,qs.stringify({token:refreshToken,'token_type_hint':'refresh_token'}),{headers:{'Content-Type':'application/x-www-form-urlencoded','Authorization': `Basic ${basic}`}});
  }
  return '';
}

export function getUserInfo(host: string) {
  return axios.get(`${host}/userinfo`);
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

const TOKEN_KEY = 'token';
const REFRESH_KEY = 'refresh';


const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_KEY);
};

const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

export { isLogin, getToken, setToken,getRefreshToken,setRefreshToken, clearToken };

import { IS_LOGIN } from './type';
export const isLogin = (payload) => {
  return {
    type: IS_LOGIN,
    payload: payload
  }
};
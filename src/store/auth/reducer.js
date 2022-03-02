import { IS_LOGIN } from './type';
const initialState = {
  isLogin: false
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload
      }
    default:
      return state;
  }
};
export default authReducer;
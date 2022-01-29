import {
  authAPI,
} from '../../../api/api';
import {toggleAppPreloderAC} from '../app-reducer/app-reducer';

import AuthState from './AuthState';
import AuthAction from './AuthAction';

const initialState: AuthState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
};

const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

const authReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isAuth: true,
      }
      break;
  
    default:
      break;
  }

  return state;
}

const setTokensAC = (accessToken: string, refreshToken: string) => {
  return {
    type: SET_ACCESS_TOKEN,
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
};

const loginTC = (email: string, password: string) => async (dispatch: Function) => {
  dispatch(toggleAppPreloderAC(true));

  const response = await authAPI.getAuthTokens(email, password);
  if (response.success) {
    const { accessToken, refreshToken } = response.data;
    dispatch(setTokensAC(accessToken, refreshToken));
  };

  dispatch(toggleAppPreloderAC(false));
};

export {
  loginTC,
}

export default authReducer;

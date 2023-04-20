import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
} from "./loginActionTypes";

export const fetchLoginRequest = () => {
  return {
    type: FETCH_LOGIN_REQUEST,
  };
};

export const fetchLoginSuccess = (data) => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: data,
  };
};

export const fetchLoginFailure = (data) => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: data,
  };
};

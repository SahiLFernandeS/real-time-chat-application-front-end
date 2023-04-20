import {
  FETCH_ALL_USER_FAILURE,
  FETCH_ALL_USER_REQUEST,
  FETCH_ALL_USER_SUCCESS,
} from "./allUserTypes";

export const fetchAllUserRequest = () => {
  return {
    type: FETCH_ALL_USER_REQUEST,
  };
};

export const fetchAllUserSuccess = (data) => {
  return {
    type: FETCH_ALL_USER_SUCCESS,
    payload: data,
  };
};

export const fetchAllUserFailure = (data) => {
  return {
    type: FETCH_ALL_USER_FAILURE,
    payload: data,
  };
};

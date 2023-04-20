import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
} from "./loginActionTypes";

const initialState = {
  loading: false,
  data: [],
  message: "",
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "",
      };

    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        message: action.payload,
      };

    default:
      return state;
  }
};

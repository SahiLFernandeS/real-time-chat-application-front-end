import {
  FETCH_ALL_USER_FAILURE,
  FETCH_ALL_USER_REQUEST,
  FETCH_ALL_USER_SUCCESS,
} from "./allUserTypes";

const initialState = {
  loading: false,
  data: [],
  message: "",
};

export const AllUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "",
      };

    case FETCH_ALL_USER_FAILURE:
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

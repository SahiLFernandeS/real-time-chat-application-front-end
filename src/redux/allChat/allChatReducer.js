import {
  FETCH_ALL_CHAT_FAILURE,
  FETCH_ALL_CHAT_REQUEST,
  FETCH_ALL_CHAT_SUCCESS,
} from "./allChatTypes";

const initialState = {
  loading: false,
  data: [],
  message: "",
};

export const allChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ALL_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "",
      };

    case FETCH_ALL_CHAT_FAILURE:
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

import {} from "./createChatActions";
import {
  FETCH_CREATE_CHAT_FAILURE,
  FETCH_CREATE_CHAT_REQUEST,
  FETCH_CREATE_CHAT_SUCCESS,
} from "./createChatTypes";

const initialState = {
  loading: false,
  data: [],
  message: "",
};

export const createChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CREATE_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CREATE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        message: "",
      };

    case FETCH_CREATE_CHAT_FAILURE:
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

const myChatInitialState = {
  activeChat: null,
};

export const myChatReducer = (state = myChatInitialState, action) => {
  switch (action.type) {
    case "SETACTIVECHAT":
      return {
        ...state,
        activeChat: action.payload,
      };

    default:
      return state;
  }
};

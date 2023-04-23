import {
  FETCH_CREATE_CHAT_FAILURE,
  FETCH_CREATE_CHAT_REQUEST,
  FETCH_CREATE_CHAT_SUCCESS,
} from "./createChatTypes";

export const fetchCreateChatRequest = () => {
  return {
    type: FETCH_CREATE_CHAT_REQUEST,
  };
};

export const fetchCreateChatSuccess = (data) => {
  return {
    type: FETCH_CREATE_CHAT_SUCCESS,
    payload: data,
  };
};

export const fetchCreateChatFailure = (data) => {
  return {
    type: FETCH_CREATE_CHAT_FAILURE,
    payload: data,
  };
};

export const myChatActive = (data) => {
  return {
    type: "SETACTIVECHAT",
    payload: data,
  };
};

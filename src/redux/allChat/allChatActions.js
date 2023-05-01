import {
  FETCH_ALL_CHAT_FAILURE,
  FETCH_ALL_CHAT_REQUEST,
  FETCH_ALL_CHAT_SUCCESS,
} from "./allChatTypes";

export const fetchAllChatRequest = () => {
  return {
    type: FETCH_ALL_CHAT_REQUEST,
  };
};

export const fetchAllChatSuccess = (data) => {
  return {
    type: FETCH_ALL_CHAT_SUCCESS,
    payload: data,
  };
};

export const fetchAllChatFailure = (error) => {
  return {
    type: FETCH_ALL_CHAT_FAILURE,
    payload: error,
  };
};

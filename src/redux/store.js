import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./login/loginReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { AllUserReducer } from "./allUser/allUserReducer";
import {
  createChatReducer,
  myChatReducer,
} from "./createChat/createChatReducer";

const persistConfig = {
  key: "root",
  storage,
};

const combined = combineReducers({
  login: loginReducer,
  allUser: AllUserReducer,
  createChat: createChatReducer,
  activeState: myChatReducer,
});

const persistedReducer = persistReducer(persistConfig, combined);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

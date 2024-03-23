import { combineReducers } from "redux";
import { userListReducer } from "./userList";
import { formDataReducer } from "./formData";
import { formInfoReducer } from "./formInfo";

export const RootReducer = combineReducers({
  users: userListReducer,
  formData: formDataReducer,
  formInfo: formInfoReducer,
});

export type RootState = ReturnType<typeof RootReducer>;

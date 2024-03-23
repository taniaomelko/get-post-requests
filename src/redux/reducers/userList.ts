import { IUser } from "../../types/IUser";

const initialState = {
  allUsers: [],
};
interface userListState {
  allUsers: IUser[],
}

type userListAction =
  | { type: 'FETCH_USERS'; payload: IUser[] }
  | { type: 'ADD_USER'; payload: IUser } ;

export const userListReducer = (state: userListState = initialState, action: userListAction) => {
  switch (action.type) {
    case 'FETCH_USERS':
    const newUsers = action.payload.filter((newUser) => 
      !state.allUsers.some((user) => user.id === newUser.id));
      return {
        ...state,
        allUsers: [...state.allUsers, ...newUsers],
      };
    case 'ADD_USER':
      const updatedUsers = state.allUsers.length >= 6 ? state.allUsers.slice(0, 5) : state.allUsers;
      return {
        ...state,
        allUsers: [action.payload, ...updatedUsers],
      };
    default:
      return state;
  }
}

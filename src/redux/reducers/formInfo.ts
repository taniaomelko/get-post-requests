import { IInfo } from "../../types/IInfo";
import { IPosition } from "../../types/IPosition";

const initialState = {
  response: {
    page: 1,
    count: 6,
    links: {
      next_url: '', 
      prev_url: '',
    },
    total_pages: 0,
    total_users: 0
  },
  token: '',
  positions: [],
};

interface formInfoState {
  response: IInfo,
  token: string;
  positions: IPosition[]
}

type formInfoAction =
  | { type: 'UPDATE_INFO'; payload: IInfo } 
  | { type: 'GET_TOKEN'; payload: string }
  | { type: 'GET_POSITIONS'; payload: IPosition[] } ;

export const formInfoReducer = (state: formInfoState = initialState, action: formInfoAction) => {
  switch (action.type) {
    case 'UPDATE_INFO':
      return {
        ...state,
        response: action.payload,
      };
    case 'GET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'GET_POSITIONS':
      return {
        ...state,
        positions: action.payload,
      };
    default:
      return state;
  }
}

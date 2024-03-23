import { IPosition } from "../../types/IPosition";
import { IPhoto } from "../../types/IPhoto";

const initialState = {
  name: '',
  email: '',
  phone: '',
  position: '',
  position_id: 0,
  photo: {
    file: null,
    name: 'Upload your photo',
    size: 0,
    type: '',
    width: 0,
    height: 0,
  },
};

interface formDataState {
  name: string,
  email: string,
  phone: string,
  position: string,
  position_id: number,
  photo: IPhoto,
}

type formDataAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PHONE'; payload: string }
  | { type: 'SET_POSITION'; payload: IPosition }
  | { type: 'SET_PHOTO'; payload: IPhoto }
  | { type: 'RESET_FORM_DATA' } ;

export const formDataReducer = (state: formDataState = initialState, action: formDataAction) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload
      };
    case 'SET_EMAIL':
      return {
        ...state,
          email: action.payload
      };
    case 'SET_PHONE':
      const { payload } = action;
      let digitsOnly = payload.replace(/\D/g, ''); // Remove non-digits
      if (!payload.startsWith('+38')) {
        digitsOnly = '38' + digitsOnly; // Ensure the prefix is present
      }

      // Prevent input longer than the formatted number
      if (digitsOnly.length > 12) {
        return state;
      }

      if (digitsOnly.length < 3) {
        return {
          ...state,
          phone: '+38 ',
        };
      }

      let formattedValue = '+38 ';
    
      if (digitsOnly.length > 2) {
        const parts = [
          digitsOnly.slice(2, 5), // Area code
          digitsOnly.slice(5, 8), // First 3 digits
          digitsOnly.slice(8, 10), // Next 2 digits
          digitsOnly.slice(10, 12), // Last 2 digits
        ].filter(Boolean); // Remove empty strings to avoid trailing separators
    
        formattedValue += parts.length > 0 ? '(' + parts[0] : '';
        formattedValue += parts.length > 1 ? ') ' + parts[1] : '';
        formattedValue += parts.length > 2 ? ' - ' + parts[2] : '';
        formattedValue += parts.length > 3 ? ' - ' + parts[3] : '';
      }
    
      return {
        ...state,
        phone: formattedValue,
      };
    case 'SET_POSITION':
      return {
        ...state,
        position: action.payload.name,
        position_id: action.payload.id,
      };
    case 'SET_PHOTO':
      return {
        ...state,
        photo: { ...action.payload }
      };
    case 'RESET_FORM_DATA':
      return initialState;
    default:
      return state;
  }
}

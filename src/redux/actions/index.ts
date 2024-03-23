import { IUser } from "../../types/IUser";
import { IInfo } from "../../types/IInfo";
import { IPosition } from "../../types/IPosition";
import { IPhotoData } from "../../types/IPhotoData";

// user list
export const fetchUsersAction = (users: IUser[]) => ({
  type: 'FETCH_USERS',
  payload: users,
});

export const addUser = (user: IUser) => ({
  type: 'ADD_USER',
  payload: user,
});

// form info
export const getToken = (token: string) => ({
  type: 'GET_TOKEN',
  payload: token,
});

export const getPositions = (positions: string) => ({
  type: 'GET_POSITIONS',
  payload: positions,
});

export const updateInfo = (info: IInfo) => ({
  type: 'UPDATE_INFO',
  payload: info,
});

// form data
export const setName = (name: string) => ({
  type: 'SET_NAME',
  payload: name,
});

export const setEmail = (email: string) => ({
  type: 'SET_EMAIL',
  payload: email,
});

export const setPhone = (phone: string) => ({
  type: 'SET_PHONE',
  payload: phone,
});

export const setPosition = (position: IPosition) => ({
  type: 'SET_POSITION',
  payload: position,
});

export const setPhoto = ({ file, width, height }: IPhotoData) => ({
  type: 'SET_PHOTO',
  payload: {
    name: file.name,
    size: file.size,
    type: file.type,
    width,
    height,
  },
});

export const resetFormData = () => ({
  type: 'RESET_FORM_DATA',
});

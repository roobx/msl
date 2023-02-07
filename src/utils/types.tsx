import { rootReducer } from '../services/reducers/index';
import { ThunkAction } from 'redux-thunk';
import { TConstructorActions } from '../services/actions/constructor';
import { TCurrentIngridientActions } from '../services/actions/current-ingridient';
import { TCurrentUserActions } from '../services/actions/current-user';
import { TIngridientsActions } from '../services/actions/ingridients';
import { TOrderActions } from '../services/actions/order';
import { TSocketActions } from '../services/actions/socket';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
} from '../services/constants/socket';
import type { } from "redux-thunk/extend-redux";

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions =
  TConstructorActions
  | TCurrentIngridientActions
  | TCurrentUserActions
  | TIngridientsActions
  | TOrderActions
  | TSocketActions;

export type TAppActions = {
  type: string;
  payload?: string;
}

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
}


export type TypesWS = {
  wsInit: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;


export type AppDispatch<TReturnType = void> = (
  action: TApplicationActions | AppThunk<TReturnType>
) => TReturnType;



export interface IIngredient {
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
  __v: number,
  _id: string
};

export interface IIngredientItem extends IIngredient {
  dragId: string;
}

export interface IConstructorItem {
  item: IIngredientItem;
  handleClose: (id: string) => void;
  handleDrag: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

export interface IIngridientItem {
  ingridient: IIngredient;
  onClick: (i: any) => void;
  count: number;
}

export interface IModalOverlayProps {
  children?: JSX.Element;
  opened: Boolean;
  onClose: () => void;
}

export interface IModalProps extends IModalOverlayProps {
  title?: string;
}

export interface ILocation {
  from?: Location;
  background?: Location;
  pathname?: string;
  id?: string;
}

export interface IUser {
  name: string;
  email: string;
}

export interface IUserResponce {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
  user?: IUser;
};

export interface ICurrentUser {
  email: string;
  name: string;
  resetEmailRequest: boolean;
  resetEmailFailed: boolean;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  resetEmailSucces: boolean;
  signInRequest: boolean;
  signInFailed: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  getUserRequest: boolean;
  getUserFailed: boolean;
  exitRequest: boolean;
  exitFailed: boolean;
}


export type ISocketDataOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  name: string;
  updatedAt: string;
};




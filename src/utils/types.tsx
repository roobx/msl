import { store } from '../index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TConstructorActions } from '../services/actions/constructor';
import { TCurrentIngridientActions } from '../services/actions/current-ingridient';
import { TCurrentUserActions } from '../services/actions/current-user';
import { TIngridientsActions } from '../services/actions/ingridients';
import { TOrderActions } from '../services/actions/order';


export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  TConstructorActions
  | TCurrentIngridientActions
  | TCurrentUserActions
  | TIngridientsActions
  | TOrderActions;

// export type AppThunk<TReturn = void> = ActionCreator<
//   ThunkAction<TReturn, Action, RootState, TConstructorActions>
// >;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

// export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

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
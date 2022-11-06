import { combineReducers } from 'redux';
import {
  ingridientsReducer,
  constuctorReducer,
  currentIngridientDetailsReducer,
  orderReducer,
  currentUserReducer
} from './reducers';

export const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  constuctor: constuctorReducer,
  currentIngridientDetails: currentIngridientDetailsReducer,
  order: orderReducer,
  currentUser: currentUserReducer,
});
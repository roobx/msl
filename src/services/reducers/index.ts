import { combineReducers } from 'redux';
import {
  currentUserReducer
} from './current-user';
import {
  orderReducer
} from './order';
import {
  ingridientsReducer
} from './ingridients';
import {
  currentIngridientDetailsReducer
} from './current-ingridient';
import {
  constructorReducer
} from './constructor';
import { wsReducer } from './feed'

export const rootReducer = combineReducers({
  ingridients: ingridientsReducer,
  constructorItem: constructorReducer,
  currentIngridientDetails: currentIngridientDetailsReducer,
  order: orderReducer,
  currentUser: currentUserReducer,
  feed: wsReducer,
});
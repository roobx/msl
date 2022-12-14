import {
  GET_INGRIDIENTS,
  GET_INGRIDIENTS_SUCCES,
  GET_INGRIDIENTS_FAILED
} from '../constants/ingridients';
import {
  IIngredient
} from '../../utils/types';

import { TIngridientsActions } from '../actions/ingridients';

type TIngridientState = {
  ingridientsRequest: boolean;
  ingridientsFailed: boolean;
  ingridients: IIngredient | [];
}

const initialState: TIngridientState = {
  ingridientsRequest: false,
  ingridientsFailed: false,
  ingridients: [],
}

export const ingridientsReducer = (state = initialState, action: TIngridientsActions) => {
  switch (action.type) {
    case GET_INGRIDIENTS: {
      return {
        ...state,
        ingridientsRequest: true
      };
    }
    case GET_INGRIDIENTS_SUCCES: {
      return {
        ...state,
        ingridients: action.ingridients,
        ingridientsRequest: false
      };
    }
    case GET_INGRIDIENTS_FAILED: {
      return {
        ...state,
        ingridientsRequest: false,
        ingridientsFailed: true
      };
    }
    default:
      return state;
  }
}
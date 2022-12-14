import {
  SHOW_INGRIDIENT_DETAILS,
  HIDE_INGRIDIENT_DETAILS
} from '../constants/current-ingridient';
import {
  IIngredient
} from '../../utils/types';
import { TCurrentIngridientActions } from '../actions/current-ingridient';

type TCurrentIngridientState = {
  currentIngridientDetails: IIngredient | null;
}

export const initialState: TCurrentIngridientState = {
  currentIngridientDetails: null,
}

export const currentIngridientDetailsReducer = (state = initialState, action: TCurrentIngridientActions) => {
  switch (action.type) {
    case SHOW_INGRIDIENT_DETAILS: {
      return {
        ...state,
        currentIngridientDetails: action.currentIngridient
      };
    }
    case HIDE_INGRIDIENT_DETAILS: {
      return {
        ...state,
        currentIngridientDetails: {}
      };
    }
    default:
      return state;
  }
}
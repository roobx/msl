import {
  SHOW_INGRIDIENT_DETAILS,
  HIDE_INGRIDIENT_DETAILS
} from '../constants/current-ingridient';
import {
  IIngredient
} from '../../utils/types';
import { TCurrentIngridientActions } from '../actions/current-ingridient';

type TCurrentIngridientState = {
  currentIngridientDetails: IIngredient;
}

export const initialState: TCurrentIngridientState = {
  currentIngridientDetails: {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    name: '',
    price: 0,
    proteins: 0,
    type: '',
    __v: 0,
    _id: ''
  },
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
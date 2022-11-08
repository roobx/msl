import {
  SHOW_INGRIDIENT_DETAILS,
  HIDE_INGRIDIENT_DETAILS
} from '../actions/current-ingridient';

export const initialState = {
  currentIngridientDetails: {}
}

export const currentIngridientDetailsReducer = (state = initialState, action) => {
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
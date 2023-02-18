import {
  ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS,
  SET_BUN_ID,
  DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS,
  DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS,
  CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS,
} from "../constants/constructor";
import {
  IIngredientItem
} from '../../utils/types';

import { TConstructorActions } from '../actions/constructor';

type TConstructorState = {
  selectedConstructorIngridients: string[];
  bunId: string;
  selectedItems: IIngredientItem[];
}

export const initialState: TConstructorState = {
  selectedConstructorIngridients: [],
  bunId: '',
  selectedItems: [],
}

export const constructorReducer = (state = initialState, action: TConstructorActions) => {
  switch (action.type) {
    case ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS: {
      return {
        ...state,
        selectedConstructorIngridients:
          [...state.selectedConstructorIngridients,
          action._id,
          ],
        selectedItems: [
          ...state.selectedItems,
          action.item
        ]
      };
    }
    case DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS: {
      return {
        ...state,
        selectedConstructorIngridients: action.newIngridientsId,
        selectedItems: action.newIngridientsIdSelectedItems
      }
    }

    case DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS: {
      return {
        ...state,
        selectedConstructorIngridients: action.newIngridientsId,
        selectedItems: action.newSelectedItems
      }
    }
    case CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS: {
      return {
        ...state,
        selectedConstructorIngridients: [],
        bunId: '',
        selectedItems: []
      }
    }
    case SET_BUN_ID: {
      return {
        ...state,
        bunId: action.id
      };
    }
    default:
      return state;
  }
}
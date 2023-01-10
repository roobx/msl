import {
  ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS,
  SET_BUN_ID,
  DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS,
  DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS,
  CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS,
} from '../constants/constructor';

import {
  IIngredientItem,
  AppThunk
} from '../../utils/types';

export interface IAddSelectedConstructorIngridients {
  readonly type: typeof ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS;
  readonly _id: string;

  readonly item: IIngredientItem;
}

export interface ISetBunId {
  readonly type: typeof SET_BUN_ID;
  readonly id: string;
}

export interface IDeleteSelectedConstructorIngridients {
  readonly type: typeof DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS;
  readonly newIngridientsId: string[];
  readonly newIngridientsIdSelectedItems: IIngredientItem[];
}

export interface IDragSelectedConstructorIngridients {
  readonly type: typeof DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS;

  readonly newIngridientsId: string[];
  readonly newSelectedItems: IIngredientItem[]
}

export interface IClearSelectedConstructorIngridients {
  readonly type: typeof CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS;

}

export type TConstructorActions =
  | IAddSelectedConstructorIngridients
  | ISetBunId
  | IDeleteSelectedConstructorIngridients
  | IDragSelectedConstructorIngridients
  | IClearSelectedConstructorIngridients;

export const deleteSelectedIngridient = (dragId: string, selectedItems: IIngredientItem[]): AppThunk => {
  return (dispatch) => {
    const newIngridientsIdSelectedItems = selectedItems.filter((item) => {
      return item.dragId !== dragId
    });
    dispatch({
      type: DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS,
      newIngridientsId: newIngridientsIdSelectedItems.map(i => i._id),
      newIngridientsIdSelectedItems: newIngridientsIdSelectedItems
    });
  }
}
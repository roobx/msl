export const ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS = 'ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS';
export const SET_BUN_ID = 'SET_BUN_ID';
export const DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS = 'DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS';
export const DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS = 'DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS';
export const CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS = 'CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS';

export function deleteSelectedIngridient(dragId, selectedItems) {
  return function (dispatch) {

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
import * as types from "../constants/constructor";
import { constructorReducer, initialState } from "./constructor";


describe("constructorReducer", () => {

  it("should return the initial state", () => {
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS", () => {
    const _id = "12345678";
    const item = {}
    expect(
      constructorReducer(initialState, {
        type: types.ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS,
        _id,
        item,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        selectedConstructorIngridients: [...initialState.selectedConstructorIngridients,
          _id,
        ],
        selectedItems: [
          ...initialState.selectedItems,
          item
        ]
      })
    );
  });

  it("should handle DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS", () => {
    const newIngridientsId = [];
    const newIngridientsIdSelectedItems = []
    expect(
      constructorReducer(initialState, {
        type: types.DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS,
        newIngridientsId,
        newIngridientsIdSelectedItems,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        selectedConstructorIngridients: newIngridientsId,
        selectedItems: newIngridientsIdSelectedItems,
      })
    );
  });

  it("should handle DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS", () => {
    const newIngridientsId = [];
    const newSelectedItems = [];
    expect(
      constructorReducer(initialState, {
        type: types.DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS,
        newIngridientsId,
        newSelectedItems,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        selectedConstructorIngridients: newIngridientsId,
        selectedItems: newSelectedItems,
      })
    );
  });

  it("should handle CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS", () => {
    expect(
      constructorReducer(initialState, {
        type: types.CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        selectedConstructorIngridients: [],
        bunId: '',
        selectedItems: [],
      })
    );
  });

  it("should handle SET_BUN_ID", () => {
    const id = "12345";
    expect(
      constructorReducer(initialState, {
        type: types.SET_BUN_ID,
        id,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        bunId: id,
      })
    );
  });
});



import * as types from "../constants/ingridients";
import { ingridientsReducer, initialState } from "./ingridients";


describe("ingridientsReducer", () => {

  it("should return the initial state", () => {
    expect(ingridientsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_INGRIDIENTS", () => {

    expect(
      ingridientsReducer(initialState, {
        type: types.GET_INGRIDIENTS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        ingridientsRequest: true
      })
    );
  });

  it("should handle GET_INGRIDIENTS_SUCCES", () => {
    const ingridients = []
    expect(
      ingridientsReducer(initialState, {
        type: types.GET_INGRIDIENTS_SUCCES,
        ingridients,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        ingridients: ingridients,
        ingridientsRequest: false
      })
    );
  });

  it("should handle GET_INGRIDIENTS_FAILED", () => {

    expect(
      ingridientsReducer(initialState, {
        type: types.GET_INGRIDIENTS_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        ingridientsRequest: false,
        ingridientsFailed: true
      })
    );
  });

});



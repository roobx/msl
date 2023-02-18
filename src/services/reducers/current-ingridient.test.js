import * as types from "../constants/current-ingridient";
import { currentIngridientDetailsReducer, initialState } from "./current-ingridient";


describe("currentIngridientDetailsReducer", () => {

  it("should return the initial state", () => {
    expect(currentIngridientDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SHOW_INGRIDIENT_DETAILS", () => {
    const currentIngridient = {};
    expect(
      currentIngridientDetailsReducer(initialState, {
        type: types.SHOW_INGRIDIENT_DETAILS,
        currentIngridient,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentIngridientDetails: currentIngridient,
      })
    );
  });

  it("should handle HIDE_INGRIDIENT_DETAILS", () => {
    expect(
      currentIngridientDetailsReducer(initialState, {
        type: types.HIDE_INGRIDIENT_DETAILS
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        currentIngridientDetails: {},
      })
    );
  });

});



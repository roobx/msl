import * as types from "../constants/order";
import { orderReducer, initialState } from "./order";


describe("orderReducer", () => {

  it("should return the initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_ORDER_NUMBER", () => {

    expect(
      orderReducer(initialState, {
        type: types.GET_ORDER_NUMBER,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        orderNumberRequest: true
      })
    );
  });

  it("should handle GET_ORDER_NUMBER_SUCCES", () => {
    const orderNumber = "100";
    expect(
      orderReducer(initialState, {
        type: types.GET_ORDER_NUMBER_SUCCES,
        orderNumber
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        orderNumber: orderNumber,
        orderNumberRequest: false
      })
    );
  });

  it("should handle GET_ORDER_NUMBER_FAILED", () => {

    expect(
      orderReducer(initialState, {
        type: types.GET_ORDER_NUMBER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        orderNumberRequest: false,
        orderNumberFailed: true
      })
    );
  });

  it("should handle OPEN_ORDER_DETAILS", () => {

    expect(
      orderReducer(initialState, {
        type: types.OPEN_ORDER_DETAILS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        orderDetailsOpened: true,
      })
    );
  });

  it("should handle CLOSE_ORDER_DETAILS", () => {

    expect(
      orderReducer(initialState, {
        type: types.CLOSE_ORDER_DETAILS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        orderNumber: '',
        orderDetailsOpened: false,
      })
    );
  });
});



import * as types from "../constants/socket";
import { wsReducer, initialState } from "./feed";


describe("wsReducer", () => {

  it("should return the initial state", () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {

    expect(
      wsReducer(initialState, {
        type: types.WS_CONNECTION_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        error: undefined,
        wsConnected: true
      })
    );
  });

  it("should handle WS_CONNECTION_ERROR", () => {

    expect(
      wsReducer(initialState, {
        type: types.WS_CONNECTION_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        wsConnected: false
      })
    );
  });

  it("should handle WS_CONNECTION_CLOSED", () => {

    expect(
      wsReducer(initialState, {
        type: types.WS_CONNECTION_CLOSED,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        error: undefined,
        wsConnected: false,
      })
    );
  });

  it("should handle WS_GET_MESSAGE", () => {
    const payload = { orders: [], total: 6, totalToday: 6 }
    expect(
      wsReducer(initialState, {
        type: types.WS_GET_MESSAGE,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        error: undefined,
        orders: payload.orders,
        total: payload.total,
        totalToday: payload.totalToday,
      })
    );
  });



});



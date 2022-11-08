import {
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_SUCCES,
  GET_ORDER_NUMBER_FAILED,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
} from '../actions/order';

const initialState = {
  orderNumberRequest: false,
  orderNumberFailed: false,
  orderNumber: '',
  orderDetailsOpened: false
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumberRequest: true
      };
    }
    case GET_ORDER_NUMBER_SUCCES: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderNumberRequest: false
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: true
      };
    }
    case OPEN_ORDER_DETAILS: {
      return {
        ...state,
        orderDetailsOpened: true,
      };
    }
    case CLOSE_ORDER_DETAILS: {
      return {
        ...state,
        orderNumber: '',
        orderDetailsOpened: false,
      };
    }

    default:
      return state;
  }
}
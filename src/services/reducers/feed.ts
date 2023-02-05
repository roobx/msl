import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../constants/socket';
import { TSocketActions } from '../actions/socket'
import type { ISocketDataOrder } from '../../utils/types';

type TWSState = {
  wsConnected: boolean;
  orders: ISocketDataOrder[];
  total: number;
  totalToday: number;
  error?: string;
}

const initialState: TWSState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};


export const wsReducer = (state = initialState, action: TSocketActions) => {
  switch (action.type) {

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };


    case WS_CONNECTION_ERROR:
      return {
        ...state,

        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,

      };


    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
}; 
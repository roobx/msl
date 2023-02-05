
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_MY_ORDERS_CONNECTION_START,
} from '../constants/socket';


export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;

}

export interface IWsMyOrdersConnectionStart {
  readonly type: typeof WS_MY_ORDERS_CONNECTION_START;

}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: any;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
}

export interface IWsCloseConection {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export type TSocketActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsGetMessage
  | IWsCloseConection
  | IWsMyOrdersConnectionStart;
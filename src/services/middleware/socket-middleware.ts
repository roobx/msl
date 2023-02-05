import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../../utils/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_MY_ORDERS_CONNECTION_START,
} from '../constants/socket';
import { getCookie } from '../../utils/utils';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: any) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}/all`);
      }
      if (type === WS_MY_ORDERS_CONNECTION_START) {

        const accessToken = getCookie("accessToken");
        const token = accessToken?.split('Bearer ')[1];

        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }

      if (socket) {

        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          console.log(event);
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: WS_GET_MESSAGE, payload: restParsedData });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED });
        };
      }

      next(action);
    };
  }) as Middleware;
}; 
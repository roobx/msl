import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../../utils/types';
import { TSocketActions } from '../actions/socket';
import { TypesWS } from '../../utils/types'

export const socketMiddleware = (wsActions: TypesWS): Middleware => {

  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TSocketActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        }

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        }

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: parsedData });
        }

        socket.onclose = (event) => {
          dispatch({ type: onClose });
        }
      }
      next(action);
    };

  }) as Middleware;
}

import { url } from '../../utils/consts';
import { checkResponse } from '../../utils/utils';
import {
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_SUCCES,
  GET_ORDER_NUMBER_FAILED,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS,
} from '../constants/order';
import {
  AppThunk
} from '../../utils/types';
import { getCookie } from '../../utils/utils';

export interface IGetOrderNumber {
  readonly type: typeof GET_ORDER_NUMBER;
}

export interface IGetOrderNumberSucces {
  readonly type: typeof GET_ORDER_NUMBER_SUCCES;
  readonly orderNumber: string;
}

export interface IGetOrderNumberFailed {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IOpenOrderDetails {
  readonly type: typeof OPEN_ORDER_DETAILS;
}

export interface ICloseOrderDetails {
  readonly type: typeof CLOSE_ORDER_DETAILS;
}

export type TOrderActions =
  | IGetOrderNumber
  | IGetOrderNumberSucces
  | IGetOrderNumberFailed
  | IOpenOrderDetails
  | ICloseOrderDetails;

export const getOrderNumber = (ingridientsId: string[]): AppThunk => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_NUMBER
    });
    fetch(`${url}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${getCookie("accessToken")}`,
      },
      body: JSON.stringify({
        ingredients: ingridientsId
      })
    })
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCES,
          orderNumber: res.order.number
        });
        dispatch({
          type: OPEN_ORDER_DETAILS
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        })
      })
  }

};






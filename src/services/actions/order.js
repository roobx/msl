import { url } from '../../utils/consts.ts';
import { checkResponse } from '../../utils/utils';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const GET_ORDER_NUMBER_SUCCES = 'GET_ORDER_NUMBER_SUCCES';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const OPEN_ORDER_DETAILS = 'OPEN_ORDER_DETAILS';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export function getOrderNumber(ingridientsId) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER
    });
    fetch(`${url}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
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
}





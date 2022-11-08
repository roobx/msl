import { url } from '../../utils/consts.js';
import { checkResponse } from '../../utils/utils';
export const GET_INGRIDIENTS = 'GET_INGRIDIENTS';
export const GET_INGRIDIENTS_SUCCES = 'GET_INGRIDIENTS_SUCCES';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';

export function getIngridients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGRIDIENTS
    });
    fetch(`${url}ingredients`)
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: GET_INGRIDIENTS_SUCCES,
          ingridients: res.data
        })
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_INGRIDIENTS_FAILED
        })
      })
  }
}
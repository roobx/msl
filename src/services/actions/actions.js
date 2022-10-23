import { url } from '../../utils/consts.js';

export const GET_INGRIDIENTS = 'GET_INGRIDIENTS';
export const GET_INGRIDIENTS_SUCCES = 'GET_INGRIDIENTS_SUCCES';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';
export const ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS = 'ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS';
export const DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS = 'DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS';
export const CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS = 'CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS';
export const DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS = 'DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS';
export const SHOW_INGRIDIENT_DETAILS = 'SHOW_INGRIDIENT_DETAILS';
export const HIDE_INGRIDIENT_DETAILS = 'HIDE_INGRIDIENT_DETAILS';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const GET_ORDER_NUMBER_SUCCES = 'GET_ORDER_NUMBER_SUCCES';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const OPEN_ORDER_DETAILS = 'OPEN_ORDER_DETAILS';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';
export const SET_BUN_ID = 'SET_BUN_ID';

const checkResponse = res => res.ok ? res.json() : Promise.reject(res.status);

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
          type: 'OPEN_ORDER_DETAILS'
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

export function deleteSelectedIngridient(id, ingridientsId) {
  return function (dispatch) {
    let flag = true;
    const newIngridientsId = ingridientsId.filter((item) => {
      if (flag && item === id) { flag = false; return item !== id; }
      else return true;
    });
    dispatch({
      type: 'DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS',
      newIngridientsId: newIngridientsId
    });

  }
}




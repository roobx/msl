import { url } from '../../utils/consts';
import { checkResponse } from '../../utils/utils';

import {
  GET_INGRIDIENTS,
  GET_INGRIDIENTS_SUCCES,
  GET_INGRIDIENTS_FAILED
} from '../constants/ingridients';

import {
  IIngredient
} from '../../utils/types';

import {
  AppThunk
} from '../../utils/types';

export interface IGetIngridients {
  readonly type: typeof GET_INGRIDIENTS;
}

export interface IGetIngridientsSucces {
  readonly type: typeof GET_INGRIDIENTS_SUCCES;
  readonly ingridients: IIngredient[];
}

export interface IGetIngridientsFailed {
  readonly type: typeof GET_INGRIDIENTS_FAILED;
}

export type TIngridientsActions =
  | IGetIngridients
  | IGetIngridientsSucces
  | IGetIngridientsFailed;


export const getIngridients = (): AppThunk => {
  return (dispatch) => {
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

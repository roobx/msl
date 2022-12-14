import {
  SHOW_INGRIDIENT_DETAILS,
  HIDE_INGRIDIENT_DETAILS,
} from '../constants/current-ingridient';

import {
  IIngredient
} from '../../utils/types';

export interface IShowIngridientsDetails {
  readonly type: typeof SHOW_INGRIDIENT_DETAILS;
  readonly currentIngridient: IIngredient;
}

export interface IHideIngridientsDetails {
  readonly type: typeof HIDE_INGRIDIENT_DETAILS;
}

export type TCurrentIngridientActions =
  | IShowIngridientsDetails
  | IHideIngridientsDetails;
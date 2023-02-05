import { IIngredient } from '../utils/types';

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string | number | boolean, props: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 });
}

export function setTokens(accessToken: string, refreshToken: string) {
  setCookie('accessToken', accessToken, '');
  localStorage.setItem('refreshToken', refreshToken);
}

export const checkResponse = (res: Response) => res.ok ? res.json() : Promise.reject(res.status);


export const CreatedOrderDay = (date: Date, orderDate: Date) => {
  const dateNum = Date.parse(date.toISOString().slice(0, 10));
  const orderDateNum = Date.parse(orderDate.toISOString().slice(0, 10));
  return dateNum - orderDateNum === 0
    ? 'Сегодня'
    : (dateNum - orderDateNum) / 86400000 === 1
      ? 'Вчера'
      : `${(dateNum - orderDateNum) / 86400000}  ${'дня(ей) назад,'}`;
};

export const getOrderDate = (createdAt: string) => {
  if (createdAt) {
    const date = new Date();
    const orderDate = new Date(createdAt);
    const hours =
      orderDate.getHours() > 9
        ? `${orderDate.getHours()}`
        : `0${orderDate.getHours()}`;
    const minutes =
      orderDate.getMinutes() > 9
        ? `${orderDate.getMinutes()}`
        : `0${orderDate.getMinutes()}`;

    return `${CreatedOrderDay(date, orderDate)} ${hours}:${minutes}`;
  }
};

export const getOrderPrice = (ingredients: IIngredient[]) => {
  return ingredients?.reduce(
    (item, curr) =>
      curr.type === 'bun' ? 2 * curr.price + item : item + curr.price,
    0
  );
};
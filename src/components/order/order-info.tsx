import { FC, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import orderStyles from './order.module.css';
import {
  WS_CONNECTION_START
} from '../../services/constants/socket';
import { useLocation } from "react-router";
import { ILocation } from '../../utils/types';
import { ISocketDataOrder } from '../../utils/types';
import { IIngredient } from '../../utils/types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderDate, getOrderPrice } from '../../utils/utils';
import { wsUrl } from '../../utils/consts';
import { getCookie } from '../../utils/utils';

const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.feed);
  const location = useLocation<ILocation>();
  const allIngridients = useSelector((state) => state.ingridients.ingridients);
  const accessToken = getCookie("accessToken");
  const token = accessToken?.split('Bearer ')[1];

  useEffect(() => {
    if (orders.length === 0 && location.pathname.includes('feed')) {
      dispatch(
        { type: WS_CONNECTION_START, payload: `${wsUrl}/all` }
      );
    } else if (orders.length === 0) {
      dispatch(
        { type: WS_CONNECTION_START, payload: `${wsUrl}?token=${token}` }
      );
    }

  }, [dispatch, location]);

  const currentOrder = useMemo(
    () => orders?.find((i: ISocketDataOrder) => i._id === location.pathname.replace('/feed/', '') || i._id === location.pathname.replace('/profile/orders/', '')),
    [orders, location]);

  const ingredientsObjects = currentOrder?.ingredients.map((id: string) => allIngridients.filter((item: IIngredient) => item._id === id)).flat();

  const uniqIngredientsObjects = ingredientsObjects?.reduce((acc: IIngredient[], item: IIngredient) => {
    if (acc.includes(item)) {
      return acc;
    }
    return [...acc, item];
  }, []);

  const getCount = (ingredients: string[]) => {
    const quantityItems = {};
    ingredients?.reduce((item: { [key: string]: number }, el: string) => {
      item[el] = (item[el] || 0) + 1;
      return item;
    }, quantityItems);
    return quantityItems;
  };

  const numberOfIngredients = getCount(currentOrder?.ingredients);

  const counts: Array<number> = Object.values(numberOfIngredients);


  return (
    <>
      <p className={`mb-10 text text_type_digits-default`}>#{currentOrder?.number}</p>
      <p className={`mb-3 text text_type_main-medium ${orderStyles.order_info_text}`}>{currentOrder?.name}</p>
      <p className={`mb-15 text text_type_main-default ${orderStyles.order_info_text} ${orderStyles.order_info_text_color}`}>{currentOrder?.status === 'done' ? 'Выполнен' : 'В процессе'}</p>
      <p className={`mb-6 text text_type_main-medium ${orderStyles.order_info_text}`}>Состав:</p>
      <ul className={`${orderStyles.order_info_ingridients} `}>
        {uniqIngredientsObjects
          ?.map((ingredientsObject: IIngredient, index: number) =>
          (
            <li key={ingredientsObject._id + index}
              className={`mb-4 text text_type_main-default ${orderStyles.order_info_ingridient} `}
            >
              <div className={`mr-4 ${orderStyles.order_ingridients_image}`}
                style={{
                  backgroundImage: `url(${ingredientsObject.image})`,
                }}
              >
              </div>
              <p className={`mr-4 ${orderStyles.order_ingridients_title}`}>{ingredientsObject.name}</p>
              <div className={`mr-6 ${orderStyles.order_ingridients_price}`}>
                <p className={`mr-2 text text_type_digits-default`}>{counts[index]}</p>
                <p className={`mr-2 text text_type_digits-default`}>x</p>
                <p className={`mr-2 text text_type_digits-default`}>{ingredientsObject.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
      </ul>
      <div className={`mt-10 ${orderStyles.order_info_footer}`}>
        <p className="text text_type_main-default text_color_inactive">{getOrderDate(currentOrder?.createdAt)}</p>
        <div className={`text text_type_digits-default ${orderStyles.order_item_price}`}>
          {getOrderPrice(ingredientsObjects)}
          <div className={`ml-2 pt-2`}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderInfo;
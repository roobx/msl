import { FC } from 'react';
import orderStyles from './order.module.css';
import { useLocation, Link } from "react-router-dom";
import { ILocation } from '../../utils/types';
import { ISocketDataOrder } from '../../utils/types';
import { useSelector } from '../../services/hooks';
import { IIngredient } from '../../utils/types';
import { getOrderDate, getOrderPrice } from '../../utils/utils';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Order: FC<ISocketDataOrder> = ({ _id, number, createdAt, name, ingredients }) => {

  const location = useLocation<ILocation>();
  const allIngridients = useSelector((state) => state.ingridients.ingridients);

  const path =
    location.pathname === "/feed"
      ? `/feed/${_id}`
      : `/profile/orders/${_id}`;

  const ingredientsObjects = ingredients.map((id) => allIngridients.filter((item: IIngredient) => item._id === id)).flat();

  const uniqIngredientsObjects = ingredientsObjects.reduce((acc: IIngredient[], item: IIngredient) => {
    if (acc.includes(item)) {
      return acc;
    }
    return [...acc, item];
  }, []);

  return (
    <Link
      to={{
        pathname: path,
        state: { background: location, id: _id },
      }}
      className={`mb-4 p-6 ${orderStyles.order_item}`}>
      <div className={`mb-6 ${orderStyles.order_item_header}`}>
        <p className='text text_type_digits-default'>{`#${number}`}</p>
        <p className="text text_type_main-default text_color_inactive">{getOrderDate(createdAt)}</p>
      </div>
      <h3 className={`mb-6 text text_type_main-medium ${orderStyles.order_title}`}>{name}</h3>
      <div className={`${orderStyles.order_ingridients}`}>
        <ul className={`${orderStyles.order_ingridients_images}`}>
          {uniqIngredientsObjects
            .slice(0, 6)
            .map((ingredientsObject, index) =>
            (
              <li key={ingredientsObject._id}
                className={`text text_type_digits-default ${orderStyles.order_ingridients_image} ${index === 5 && uniqIngredientsObjects.length > 6 ? orderStyles.order_ingridients_image_last : ''}`}
                style={{
                  backgroundImage: `url(${ingredientsObject.image})`,
                  zIndex: 6 - index
                }}
              >
                {index === 5 && uniqIngredientsObjects.length > 6 && `+${uniqIngredientsObjects.length - 6}`}
              </li>
            ))}
        </ul>
        <div className={`text text_type_digits-default ${orderStyles.order_item_price}`}>
          {getOrderPrice(ingredientsObjects)}
          <div className={`ml-2 pt-2`}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link >
  );
}

export default Order;
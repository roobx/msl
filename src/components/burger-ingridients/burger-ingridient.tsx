import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";
import burgerIngridientsStyles from './burger-ingridients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { IIngridientItem } from '../../utils/types';
import { ILocation } from '../../utils/types';

const BurgerIngridient: FC<IIngridientItem> = ({ ingridient, onClick, count }) => {
  const { _id, type } = ingridient;
  const [, ref] = useDrag({
    type: 'ingridient',
    item: { _id, type }
  });
  const location = useLocation<ILocation>();


  return (
    <Link
      ref={ref}
      onClick={onClick}
      className={burgerIngridientsStyles.grid_element}
      to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location, id: _id },
      }}
      data-testid="ingredient"
    >
      <img src={ingridient.image} alt={ingridient.name} />
      {count > 0 && <Counter count={count} size="default" />}
      <div className={burgerIngridientsStyles.item_price}>
        <p className='mt-1 mb-1 mr-2'>{ingridient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${burgerIngridientsStyles.item_name}`}>{ingridient.name}</p>
    </Link>


  );
}


export default BurgerIngridient;
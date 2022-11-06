import { Link } from 'react-router-dom';
import { useLocation } from "react-router";

import burgerIngridientsStyles from './burger-ingridients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes, { shape } from 'prop-types';
import { useDrag } from "react-dnd";
import { ingredientType } from '../../utils/types';

function BurgerIngridient({ ingridient, onClick, count }) {
  const { _id, type } = ingridient;
  const [, ref] = useDrag({
    type: 'ingridient',
    item: { _id, type }
  });
  const location = useLocation();


  return (
    <Link
      ref={ref}
      onClick={onClick}
      className={burgerIngridientsStyles.grid_element}
      to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location, id: _id },
      }}
    >
      <img src={ingridient.image} />
      {count > 0 && <Counter count={count} size="default" />}
      <div className={burgerIngridientsStyles.item_price}>
        <p className='mt-1 mb-1 mr-2'>{ingridient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${burgerIngridientsStyles.item_name}`}>{ingridient.name}</p>
    </Link>


  );
}

BurgerIngridient.propTypes = {
  ingridient: shape(ingredientType).isRequired,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number,
}

export default BurgerIngridient;
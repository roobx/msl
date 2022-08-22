import { useContext, useState } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../../services/data-context.js';
import { selectedBun, selectedItems } from '../../utils/consts.js'
import PropTypes from 'prop-types';

function BurgerConstructor({ handleOrderDetailsClick }) {

  const { data } = useContext(DataContext);
  const totalPrice = selectedItems.reduce((acc, iter) => {
    return iter.type === 'bun' ? acc + iter.price * 2 : acc + iter.price;
  }, 0) + 2 * selectedBun.price;

  const ingredientsId = selectedItems.map(i => i._id);
  ingredientsId.push(selectedBun._id);

  const onButtonClick = (event) => {
    event.preventDefault();
    handleOrderDetailsClick(ingredientsId);
  }

  return (
    <>
      {selectedBun &&
        (<div key={`${selectedBun._id}top`} className='ml-6'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </div>)}
      <div className={burgerConstructorStyles.items}>
        {
          selectedItems.map((item, index) =>
          (
            item &&
            (<div key={`${item._id}${index}`} className={burgerConstructorStyles.item} >
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>)
          )
          )
        }
      </div>
      {selectedBun &&
        (<div key={`${selectedBun._id}bottom`} className='ml-6'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </div>)}
      <div className={burgerConstructorStyles.button_container}>
        <div className={burgerConstructorStyles.price}>
          <p className='mt-1 mb-1 mr-2 text text_type_main-large'>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={onButtonClick} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
  handleOrderDetailsClick: PropTypes.func.isRequired
};

export default BurgerConstructor;
import React, { useState } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data.js';

function BurgerConstructor() {

  return (
    <>
      <div className={burgerConstructorStyles.items}>
        {
          data.map(item =>
          (
            <div className={burgerConstructorStyles.item}>
              <DragIcon type="primary" />

              <ConstructorElement

                isLocked={true}
                text={item.name}
                price={item.price}
                thumbnail={item.image}

              />
            </div>
          )

          )
        }
      </div>
      <div className={burgerConstructorStyles.button_container}>
        <div className={burgerConstructorStyles.price}>
          <p className='mt-1 mb-1 mr-2 text text_type_main-large'>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </>

  );
}

export default BurgerConstructor;
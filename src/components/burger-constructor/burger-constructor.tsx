import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data.js';

function BurgerConstructor() {

  const selectedBunId = "60666c42cc7b410027a1a9b1";
  const selectedItemsId = [
    "60666c42cc7b410027a1a9b5",
    "60666c42cc7b410027a1a9b6",
    "60666c42cc7b410027a1a9b6",
    "60666c42cc7b410027a1a9b7",
    "60666c42cc7b410027a1a9b4",
    "60666c42cc7b410027a1a9b9"
  ]
  const selectedItems = selectedItemsId.map(id => data.find(item => id === item._id));

  console.log(selectedItems);

  return (
    <>
      {
        data.filter(item => item._id === selectedBunId)
          .map(i =>
          (<div key={i._id} className='ml-6'>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${i.name} (верх)`}
              price={i.price}
              thumbnail={i.image}
            />
          </div>
          )
          )
      }
      <div className={burgerConstructorStyles.items}>
        {
          selectedItems.map(item =>
          (
            item &&
            <div key={item._id} className={burgerConstructorStyles.item} >
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          )
          )

        }

      </div>
      {
        data.filter(item => item._id === selectedBunId)
          .map(i =>
          (<div key={i._id} className='ml-6'>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${i.name} (низ)`}
              price={i.price}
              thumbnail={i.image}
            />
          </div>
          )
          )
      }
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
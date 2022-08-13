import React from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'



interface dataObjProps {
  _id?: string;
  name: string;
  price: number;
  image: string;
  type: string;

}

interface BurgerConstructorProps {
  data: Array<dataObjProps>;
  handleOrderDetailsClick: () => void;
}

function BurgerConstructor({ data, handleOrderDetailsClick }: BurgerConstructorProps) {

  const selectedBunId = "60d3b41abdacab0026a733c6";
  const selectedItemsId = [
    "60d3b41abdacab0026a733cd",
    "60d3b41abdacab0026a733c9",
    "60d3b41abdacab0026a733cb"
  ]
  const selectedItems = selectedItemsId.map(id => data.find(item => id === item._id));

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
        <Button onClick={handleOrderDetailsClick} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </>

  );
}


export default BurgerConstructor;
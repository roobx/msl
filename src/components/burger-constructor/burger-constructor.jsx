import { useContext, useState } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import { ingredientType } from '../../utils/types';
import { DataContext } from '../../services/data-context.js';



function BurgerConstructor({ handleOrderDetailsClick }) {

  const { data } = useContext(DataContext);



  const [selectedItemsId] = useState([
    "60d3b41abdacab0026a733cd",
    "60d3b41abdacab0026a733c9",
    "60d3b41abdacab0026a733cb"
  ]);
  const [selectedBunId] = useState("60d3b41abdacab0026a733c6");

  const selectedItems = selectedItemsId.map(id => data.find(item => id === item._id));
  const selectedBun = data.find(item => item._id === selectedBunId);


  let totalPrice = selectedItems.reduce((acc, iter) => {
    return iter.type === 'bun' ? acc.price + iter.price * 2 : acc.price + iter.price
  }, 0);



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
        <Button onClick={handleOrderDetailsClick} type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </>
  );
}


export default BurgerConstructor;
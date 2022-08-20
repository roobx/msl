import { useContext, useState } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
// import { ingredientType } from '../../utils/types';
import { DataContext } from '../../services/data-context.js';



function BurgerConstructor({ handleOrderDetailsClick }) {

  const { data } = useContext(DataContext);

  const selectedItems = [
    {
      "_id": "60d3b41abdacab0026a733d4",
      "name": "Сыр с астероидной плесенью",
      "type": "main",
      "proteins": 84,
      "fat": 48,
      "carbohydrates": 420,
      "calories": 3377,
      "price": 4142,
      "image": "https://code.s3.yandex.net/react/code/cheese.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
      "__v": 0
    },
    {
      "_id": "60d3b41abdacab0026a733d3",
      "name": "Мини-салат Экзо-Плантаго",
      "type": "main",
      "proteins": 1,
      "fat": 2,
      "carbohydrates": 3,
      "calories": 6,
      "price": 4400,
      "image": "https://code.s3.yandex.net/react/code/salad.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
      "__v": 0
    },
    {
      calories: 4242,
      carbohydrates: 242,
      fat: 142,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      name: 'Биокотлета из марсианской Магнолии',
      price: 424,
      proteins: 420,
      type: 'main',
      __v: 0,
      _id: '60d3b41abdacab0026a733cb',
    },
  ];

  const selectedBun = {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0,
    _id: '60d3b41abdacab0026a733c6',
  }

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


export default BurgerConstructor;
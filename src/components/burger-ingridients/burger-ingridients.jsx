import React, { useState, useContext } from 'react';
import burgerIngridientsStyles from './burger-ingridients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../../services/data-context.js';
import PropTypes from 'prop-types';

function BurgerIngriiednts({ handleIngredientDetailsClick }) {

  const [current, setCurrent] = useState('one');
  const { data } = useContext(DataContext);
  const onIngredientClick = (item) => (event) => {
    handleIngredientDetailsClick(item)
  }


  return (
    <>
      <h2 className='text text_type_main-large'>
        Соберите бургер
      </h2>
      <div className={`mt-5 ${burgerIngridientsStyles.tab}`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`mt-10 ${burgerIngridientsStyles.items}`}>
        <p className='text text_type_main-medium mb-6'>Булки</p>
        <div className={`pl-4 pr-4 ${burgerIngridientsStyles.grid_container}`}>
          {
            data.filter(item => item.type === 'bun')
              .map((i) => (
                <div onClick={onIngredientClick(i)} key={i._id} className={burgerIngridientsStyles.grid_element}>
                  <img src={i.image} />
                  <Counter count={1} size="default" />
                  <div className={burgerIngridientsStyles.item_price}>
                    <p className='mt-1 mb-1 mr-2'>{i.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={`text text_type_main-default ${burgerIngridientsStyles.item_name}`}>{i.name}</p>
                </div>
              )
              )
          }
        </div>
        <p className='text text_type_main-medium mb-6 mt-10'>Соусы</p>
        <div className={`pl-4 pr-4 ${burgerIngridientsStyles.grid_container}`}>
          {
            data.filter(item => item.type === 'sauce')
              .map((i) => (
                <div onClick={onIngredientClick(i)} key={i._id} className={burgerIngridientsStyles.grid_element}>
                  <img src={i.image} />
                  <Counter count={1} size="default" />
                  <div className={burgerIngridientsStyles.item_price}>
                    <p className='mt-1 mb-1 mr-2'>{i.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={`text text_type_main-default ${burgerIngridientsStyles.item_name}`}>{i.name}</p>
                </div>
              )
              )
          }
        </div>
        <p className='text text_type_main-medium mb-6 mt-10'>Начинки</p>
        <div className={`pl-4 pr-4 ${burgerIngridientsStyles.grid_container}`}>
          {
            data.filter(item => item.type === 'main')
              .map((i) => (
                <div onClick={onIngredientClick(i)} key={i._id} className={burgerIngridientsStyles.grid_element}>
                  <img src={i.image} />
                  <Counter count={1} size="default" />
                  <div className={burgerIngridientsStyles.item_price}>
                    <p className='mt-1 mb-1 mr-2'>{i.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={`text text_type_main-default ${burgerIngridientsStyles.item_name}`}>{i.name}</p>
                </div>
              )
              )
          }
        </div>
      </div>
    </>

  );
}

BurgerIngriiednts.propTypes = {
  handleOrderDetailsClick: PropTypes.func.isRequired
};

export default BurgerIngriiednts;
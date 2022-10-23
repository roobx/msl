import React, { useState, useRef, useEffect, useCallback } from 'react';
import burgerIngridientsStyles from './burger-ingridients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import BurgerIngridient from './burger-ingridient'
import {
  SHOW_INGRIDIENT_DETAILS
} from '../../services/actions/actions';

function BurgerIngriiednts() {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('one');
  const tabRef = useRef(null);
  const itemRefOne = useRef(null);
  const itemRefTwo = useRef(null);
  const itemRefThree = useRef(null);

  const tabSettings = [
    {
      id: 'one',
      ref: itemRefOne,
      name: 'Булки',
      code: 'bun'
    },
    {
      id: 'two',
      ref: itemRefTwo,
      name: 'Соусы',
      code: 'sauce'
    },
    {
      id: 'three',
      ref: itemRefThree,
      name: 'Начинки',
      code: 'main'
    },
  ]

  const onIngredientClick = (item) => (event) => {
    dispatch({
      type: SHOW_INGRIDIENT_DETAILS,
      currentIngridient: item
    });
  }

  const handleObserver = useCallback((id) => {
    setCurrent(id);
  }, []);

  useEffect(() => {
    const option = {
      root: tabRef.current,
      rootMargin: '0px',
      threshold: 1,
    };
    tabSettings.forEach(tab => {
      const observer = new IntersectionObserver(() => handleObserver(tab.id), option);
      if (tab.ref.current) observer.observe(tab.ref.current)
    });

  }, []);

  const { ingridients } = useSelector(state => state.ingridients);
  const { selectedConstructorIngridients } = useSelector(state => ({
    selectedConstructorIngridients: [...state.constuctor.selectedConstructorIngridients, state.constuctor.bunId],
  }), shallowEqual);

  const getCount = useCallback((id) => selectedConstructorIngridients.filter(i => i === id).length, [selectedConstructorIngridients]);

  return (
    <>
      <h2 className='text text_type_main-large'>
        Соберите бургер
      </h2>
      <div className={`mt-5 ${burgerIngridientsStyles.tab}`}>
        {tabSettings.map((tab) =>
        (<Tab key={`tabs-id-${tab.id}`} value={tab.id} active={current === tab.id} onClick={setCurrent} >
          {tab.name}
        </Tab>)
        )
        }
      </div>
      <div ref={tabRef} className={`mt-10 ${burgerIngridientsStyles.items}`}>
        {
          tabSettings.map(tab =>
          (<React.Fragment key={`tabs-code-${tab.code}`}>
            <p ref={tab.ref} className='text text_type_main-medium mb-6'>{tab.name}</p>
            <div className={`pl-4 pr-4 ${burgerIngridientsStyles.grid_container}`}>
              {
                ingridients.filter(item => item.type === tab.code)
                  .map(i =>
                    <BurgerIngridient key={i._id} onClick={onIngredientClick(i)} count={getCount(i._id)} ingridient={i} />
                  )
              }
            </div>
          </React.Fragment>)
          )
        }
      </div>
    </>
  );
}


export default BurgerIngriiednts;
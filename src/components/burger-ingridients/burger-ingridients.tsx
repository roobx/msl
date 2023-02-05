import React, { useState, useRef, useEffect, useCallback, FC } from 'react';

import burgerIngridientsStyles from './burger-ingridients.module.css';
import { Tab } from '../ui-yandex/ui-yandex';
import { shallowEqual } from 'react-redux';
import { useSelector, useDispatch } from '../../services/hooks';
import BurgerIngridient from './burger-ingridient'
import {
  SHOW_INGRIDIENT_DETAILS
} from '../../services/constants/current-ingridient';
import { IIngredient } from '../../utils/types';

const BurgerIngriiednts: FC = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState<string>('one');
  const tabRef = useRef<HTMLDivElement>(null);
  const itemRefOne = useRef<HTMLDivElement>(null);
  const itemRefTwo = useRef<HTMLDivElement>(null);
  const itemRefThree = useRef<HTMLDivElement>(null);

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

  const onIngredientClick = useCallback((item: IIngredient) => (event: React.SyntheticEvent) => {
    dispatch({
      type: SHOW_INGRIDIENT_DETAILS,
      currentIngridient: item
    });

  }, [dispatch]);

  const handleObserver = useCallback((id: string) => {
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

  const { ingridients } = useSelector((state) => state.ingridients);
  const { selectedConstructorIngridients } = useSelector((state) => ({
    selectedConstructorIngridients: [...state.constructorItem.selectedConstructorIngridients, state.constructorItem.bunId],

  }), shallowEqual);

  const getCount = useCallback((id: string) => selectedConstructorIngridients.filter(i => i === id).length, [selectedConstructorIngridients]);

  return (
    <>
      <h2 className='text text_type_main-large'>
        Соберите бургер
      </h2>
      <div className={`mt-5 ${burgerIngridientsStyles.tab}`}>
        {tabSettings.map((tab) =>
        (<Tab key={`tabs-id-${tab.id}`} value={tab.id} active={current === tab.id} onClick={setCurrent} >
          {tab.name}
        </Tab>
        )
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
                ingridients.filter((item: IIngredient) => item.type === tab.code)
                  .map((i: IIngredient) =>
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
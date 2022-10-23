import React, { useState, useCallback, useEffect } from 'react'
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getOrderNumber, deleteSelectedIngridient } from '../../services/actions/actions';

import { useDrop } from 'react-dnd';
import ConstructorItem from './constructorItem'

function BurgerConstructor() {

  const dispatch = useDispatch();
  const [selectedBun, setSelectedBun] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { selectedConstructorIngridients, orderNumberRequest, selectedItems, bun } = useSelector(state => ({
    selectedConstructorIngridients: state.constuctor.selectedConstructorIngridients,
    orderNumberRequest: state.order.orderNumberRequest,
    selectedItems: state.constuctor.selectedConstructorIngridients.map(item => state.ingridients.ingridients.find(i => i._id === item)),
    bun: state.ingridients.ingridients.find(i => i._id === state.constuctor.bunId)
  }), shallowEqual);

  const [, dropTarget] = useDrop({
    accept: "ingridient",
    drop({ _id, type }) {
      if (type === 'bun') {
        dispatch({
          type: 'SET_BUN_ID',
          id: _id
        });
      }
      else {
        dispatch({
          type: 'ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS',
          id: _id
        });
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    })
  });

  useEffect(() => {
    setSelectedBun(bun);
    const bunPrice = isNaN(bun?.price) ? 0 : 2 * bun?.price;
    setTotalPrice(selectedItems.reduce(
      (acc, iter) => {
        return acc + iter?.price;
      }, 0) + bunPrice);
  }, [selectedItems, bun]);


  const onButtonClick = useCallback(() => {
    dispatch(getOrderNumber(selectedConstructorIngridients));

  }, [selectedConstructorIngridients]);

  const handleClose = useCallback((id) => {
    dispatch(deleteSelectedIngridient(id, selectedConstructorIngridients));
  }, [selectedConstructorIngridients]);

  const handleDrag = useCallback((dragIndex, hoverIndex) => {
    const dragCard = selectedConstructorIngridients[dragIndex];
    const newCards = [...selectedConstructorIngridients]
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)


    dispatch({
      type: 'DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS',
      newIngridientsId: newCards,
    })
  }, [selectedConstructorIngridients, dispatch]);


  return (
    <>
      {selectedConstructorIngridients.length === 0 && !selectedBun && <p className='text text_type_main-medium mb-6'>Перетащите ингридиенты</p>}
      {selectedBun && (<div key={`${selectedBun._id}top`} className='ml-6'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${selectedBun.name} (верх)`}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
      </div>)}
      <div ref={dropTarget} className={burgerConstructorStyles.items}>
        {
          selectedItems
            .map((item, index) =>
            (
              <ConstructorItem key={`${item._id}${index}`} item={item} handleClose={handleClose} index={index} handleDrag={handleDrag} />
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
          {orderNumberRequest ? 'Загружаем...' : 'Оформить заказ'}
        </Button>
      </div>
    </>
  );
}

export default BurgerConstructor;
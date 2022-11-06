import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import pagesStyles from './pages.module.css';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../order-details/order-details';


import {
  getIngridients,
  CLOSE_ORDER_DETAILS,
  CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS
} from '../../services/actions/actions';

function MainPage() {
  const dispatch = useDispatch();
  const { orderDetailsOpened } = useSelector(state => state.order);

  const closePopupOrder = useCallback(() => {
    dispatch({
      type: CLOSE_ORDER_DETAILS
    });
    dispatch({
      type: CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS
    });

  }, [dispatch], shallowEqual);


  useEffect(() => {
    dispatch(getIngridients())
  }, []);


  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={`pt-10 mr-10 ${pagesStyles.main_container}`}>
          <BurgerIngridients />
        </div>
        <div className={`pt-25 ${pagesStyles.main_container}`}>
          <BurgerConstructor />
        </div>
      </DndProvider>
      <Modal title='' opened={orderDetailsOpened} onClose={closePopupOrder}>
        <OrderDetails />
      </Modal>

    </>

  );
}

export default MainPage;
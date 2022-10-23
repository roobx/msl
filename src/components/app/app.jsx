import { useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getIngridients } from '../../services/actions/actions';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  const { currentIngridientDetails } = useSelector(state => state.currentIngridientDetails);
  const { orderDetailsOpened } = useSelector(state => state.order);

  function closePopup() {

    dispatch({
      type: 'HIDE_INGRIDIENT_DETAILS'
    });

    dispatch({
      type: 'CLOSE_ORDER_DETAILS'
    });
    dispatch({
      type: 'CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS'
    });
  }

  useEffect(() => {
    dispatch(getIngridients())
  }, []);

  return (
    <>

      <div className={`text text_type_main-default ${appStyles.app}`}>

        <div className={`pr-4 pl-4 ${appStyles.page}`}>

          <AppHeader />

          <main className={`${appStyles.main}`}>
            <DndProvider backend={HTML5Backend}>
              <div className={`pt-10 mr-10 ${appStyles.main_container}`}>
                <BurgerIngridients />
              </div>
              <div className={`pt-25 ${appStyles.main_container}`}>
                <BurgerConstructor />
              </div>
            </DndProvider >
          </main>

        </div>

      </div>
      <Modal title='Детали ингридиента' opened={orderDetailsOpened} onClose={closePopup}>
        <OrderDetails />
      </Modal>
      <Modal title='Детали ингридиента' opened={currentIngridientDetails._id ? true : false} onClose={closePopup}>
        <IngredientDetails />
      </Modal>

    </>

  );
}

export default App;

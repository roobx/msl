import React, { useState } from 'react';
import { url } from '../../utils/consts.js'
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal.jsx';
import { DataContext } from '../../services/data-context.js';

function App() {
  const [data, setData] = useState([]);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = React.useState(false);
  const [selectedIngridient, setselectedIngridient] = React.useState({
    _id: '',
    name: '',
    price: 0,
    image: '',
    type: ''
  });
  const [isIngredientDetailsOpen, setIsIngredientDetailsOpen] = React.useState(false);
  const [orderNumber, setOrderNumber] = useState(0);

  const checkResponse = res => res.ok ? res.json() : Promise.reject(res.status);
  const logError = err => console.log(err);

  function handleOrderDetailsClick(ingridientsId) {
    setIsOrderDetailsOpen(true);
    fetch(`${url}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        ingredients: ingridientsId
      })
    })
      .then(checkResponse)
      .then((res) => { setOrderNumber(res.order.number) })
      .catch(logError);
  }

  function handleIngredientDetailsClick(ingridient) {
    setselectedIngridient(ingridient);
    setIsIngredientDetailsOpen(true);
  }

  function closePopup() {
    setIsIngredientDetailsOpen(false);
    setIsOrderDetailsOpen(false);
    setTimeout(setselectedIngridient({
      _id: '',
      name: '',
      price: 0,
      image: '',
      type: ''
    }), 500);
  }

  React.useEffect(() => {
    fetch(`${url}ingredients`)
      .then(checkResponse)
      .then((res) => { setData(res.data) })
      .catch(logError);
  }, []);

  return (
    <>
      <DataContext.Provider value={{ data }}>
        <div className={`text text_type_main-default ${appStyles.app}`}>

          <div className={`pr-4 pl-4 ${appStyles.page}`}>

            <AppHeader />

            <main className={`${appStyles.main}`}>
              <div className={`pt-10 mr-10 ${appStyles.main_container}`}>
                <BurgerIngridients handleIngredientDetailsClick={handleIngredientDetailsClick} />
              </div>

              <div className={`pt-25 ${appStyles.main_container}`}>

                <BurgerConstructor handleOrderDetailsClick={handleOrderDetailsClick} />

              </div>
            </main>

          </div>

        </div>
        <Modal title='Детали ингридиента' opened={isOrderDetailsOpen} onClose={closePopup}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
        <Modal title='Детали ингридиента' opened={isIngredientDetailsOpen} onClose={closePopup}>
          <IngredientDetails selectedIngridient={selectedIngridient} />
        </Modal>
      </DataContext.Provider>
    </>

  );
}

export default App;

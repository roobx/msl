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
  const [selectedItemsId, setSelectedItemsId] = useState([]);


  function handleOrderDetailsClick(ingridientsId) {
    setIsOrderDetailsOpen(true);
    setSelectedItemsId(ingridientsId);
    console.log(selectedItemsId);
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
    setSelectedItemsId([]);
  }

  React.useEffect(() => {
    fetch(url)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then((res) => { setData(res.data) })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className={`text text_type_main-default ${appStyles.app}`}>

        <div className={`pr-4 pl-4 ${appStyles.page}`}>

          <AppHeader />

          <main className={`${appStyles.main}`}>
            <div className={`pt-10 mr-10 ${appStyles.main_container}`}>
              <BurgerIngridients handleIngredientDetailsClick={handleIngredientDetailsClick} data={data} />
            </div>

            <div className={`pt-25 ${appStyles.main_container}`}>
              <DataContext.Provider value={{ data }}>
                <BurgerConstructor handleOrderDetailsClick={handleOrderDetailsClick} />
              </DataContext.Provider>
            </div>
          </main>

        </div>

      </div>
      <Modal title='Детали ингридиента' opened={isOrderDetailsOpen} onClose={closePopup}>
        <OrderDetails />
      </Modal>
      <Modal title='Детали ингридиента' opened={isIngredientDetailsOpen} onClose={closePopup}>
        <IngredientDetails selectedIngridient={selectedIngridient} />
      </Modal>
    </>

  );
}

export default App;

import React from 'react';
import { url } from '../../utils/consts.js'
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';


function App() {
  const [data, setData] = React.useState([]);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = React.useState(false);
  const [selectedIngridient, setselectedIngridient] = React.useState({
    _id: '',
    name: '',
    price: 0,
    image: '',
    type: ''
  });
  const [isIngredientDetailsOpen, setIsIngredientDetailsOpen] = React.useState(false);

  function handleOrderDetailsClick() {
    setIsOrderDetailsOpen(true);
  }

  function handleIngredientDetailsClick(ingridient) {
    setselectedIngridient(ingridient);
    setIsIngredientDetailsOpen(true);
    console.log(ingridient);
  }


  function closePopup() {
    setIsOrderDetailsOpen(false);
    setselectedIngridient({
      _id: '',
      name: '',
      price: 0,
      image: '',
      type: ''
    });
    setIsIngredientDetailsOpen(false);
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
              <BurgerConstructor handleOrderDetailsClick={handleOrderDetailsClick} data={data} />
            </div>
          </main>
        </div>
      </div>
      <OrderDetails opened={isOrderDetailsOpen} onClose={closePopup} />
      <IngredientDetails opened={isIngredientDetailsOpen} selectedIngridient={selectedIngridient} onClose={closePopup} />
    </>

  );
}

export default App;

import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {
  return (
    <div className={`text text_type_main-default ${appStyles.app}`}>
      <div className={`pr-4 pl-4 ${appStyles.page}`}>
        <AppHeader />
        <main className={`${appStyles.main}`}>
          <div className={`pt-10 mr-10 ${appStyles.main_container}`}>
            <BurgerIngridients />
          </div>

          <div className={`pt-25 ${appStyles.main_container}`}>
            <BurgerConstructor />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

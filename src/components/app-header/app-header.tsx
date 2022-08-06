import React from 'react';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
      <div className={appHeaderStyles.menuitems}>
        <button className={`mr-2 pr-5 ${appHeaderStyles.menubutton}`}>
          <BurgerIcon type="primary" />
          <p className="ml-2">Конструктор</p>
        </button>
        <button className={`${appHeaderStyles.menubutton}`}>
          <ListIcon type="primary" />
          <p className="ml-2">Лента заказов</p>
        </button>
      </div>
      <a href='#' className={appHeaderStyles.logo}>
        <Logo />
      </a>

      <button className={`pl-5 ${appHeaderStyles.menubutton}`}>
        <ProfileIcon type="primary" />
        <p className="ml-2">Личный кабинет</p>
      </button>
    </header >
  );
}

export default AppHeader;
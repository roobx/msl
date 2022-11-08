import { Link, NavLink } from 'react-router-dom';
import appHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={`pt-4 pb-4 ${appHeaderStyles.header}`}>
      <div className={appHeaderStyles.menuitems}>
        <NavLink
          exact
          to='/'
          className={`mr-2 pr-5 ${appHeaderStyles.menubutton}`}
          activeClassName={appHeaderStyles.menubutton_active}
        >
          <BurgerIcon type="secondary" />
          <p className="ml-2">Конструктор</p>
        </NavLink>
        <NavLink
          exact
          to='/profile/orders'
          className={`${appHeaderStyles.menubutton}`}
          activeClassName={appHeaderStyles.menubutton_active}
        >
          <ListIcon type="secondary" />
          <p className="ml-2">Лента заказов</p>
        </NavLink>
      </div>
      <Link
        to='/'
        className={appHeaderStyles.logo}
      >
        <Logo />
      </Link>

      <NavLink
        exact
        to='/profile'
        className={`pl-5 ${appHeaderStyles.menubutton}`}
        activeClassName={appHeaderStyles.menubutton_active}
      >
        <ProfileIcon type="secondary" />
        <p className="ml-2">Личный кабинет</p>
      </NavLink>
    </header >
  );
}

export default AppHeader;
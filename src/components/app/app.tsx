import { useCallback, useEffect, FC } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { useLocation } from "react-router";
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../../pages/main-page';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Feed from '../../pages/feed-page'
import {
  HIDE_INGRIDIENT_DETAILS,
} from '../../services/constants/current-ingridient';
import { useSelector, useDispatch } from '../../services/hooks';
import Modal from '../modal/modal';
import {
  getIngridients
} from '../../services/actions/ingridients';
import OrderInfo from '../order/order-info';


const App: FC = () => {
  const ModalSwitch = () => {

    const locationHook = useLocation<any>();
    const history = useHistory();
    const dispatch = useDispatch();
    const background = locationHook.state && locationHook.state.background;

    const { currentIngridientDetails } = useSelector((state) => state.currentIngridientDetails);

    const closePopupIngridientDetails = useCallback(() => {
      dispatch({
        type: HIDE_INGRIDIENT_DETAILS
      });
      if (locationHook?.state?.id) history.goBack()
      else history.push('/')
    }, [dispatch]);

    useEffect(() => {
      dispatch(getIngridients())
    }, [dispatch]);


    return (
      <div className={`text text_type_main-default ${appStyles.app}`}>
        <div className={`pr-4 pl-4 ${appStyles.page}`}>
          <AppHeader />
          <main className={`${appStyles.main}`}>
            <Switch location={background || locationHook}>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/forgot-password">
                <ForgotPassword />
              </Route>
              <Route exact path="/reset-password">
                <ResetPassword />
              </Route>
              <Route exact path="/feed">
                <Feed />
              </Route>
              <ProtectedRoute exact path="/profile">
                <Profile />
              </ProtectedRoute>
              <Route exact path="/profile/orders">
                <Profile />
              </Route>
              <Route path='/ingredients/:ingredientId' exact>
                <div className={appStyles.ingridient}>
                  <IngredientDetails />
                </div>
              </Route>
              <Route path='/feed/:id' exact>
                <div className={appStyles.ingridient}>
                  <OrderInfo />
                </div>
              </Route>
              <Route path='/profile/orders/:id' exact>
                <div className={appStyles.ingridient}>
                  <OrderInfo />
                </div>
              </Route>
            </Switch>

            {background && (
              <Switch>
                <Route
                  exact
                  path='/ingredients/:ingredientId'
                  children={
                    <Modal
                      title='Детали ингридиента'
                      opened={currentIngridientDetails ? true : false}
                      onClose={closePopupIngridientDetails}
                    >
                      <IngredientDetails />
                    </Modal>
                  }
                />
                <Route
                  exact
                  path='/feed/:id'
                  children={
                    <Modal
                      opened={currentIngridientDetails ? true : false}
                      onClose={() => history.goBack()}
                    >
                      <OrderInfo />
                    </Modal>
                  }
                />
                <Route
                  exact
                  path='/profile/orders/:id'
                  children={
                    <Modal
                      opened={true}
                      onClose={() => history.goBack()}
                    >
                      <OrderInfo />
                    </Modal>
                  }
                />
              </Switch>

            )}
          </main>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}


export default App;



import { useCallback, useEffect } from 'react';
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
import {
  HIDE_INGRIDIENT_DETAILS,
} from '../../services/actions/current-ingridient';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Modal from '../modal/modal.jsx';

import {
  getIngridients
} from '../../services/actions/ingridients';

function App() {


  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const background = location.state && location.state.background;

    const { currentIngridientDetails } = useSelector(state => state.currentIngridientDetails);
    const closePopupIngridientDetails = useCallback(() => {
      dispatch({
        type: HIDE_INGRIDIENT_DETAILS
      });
      if (location?.state?.id) history.goBack()
      else history.push('/')
    }, [dispatch], shallowEqual);

    useEffect(() => {
      dispatch(getIngridients())
    }, [dispatch]);


    return (
      <div className={`text text_type_main-default ${appStyles.app}`}>
        <div className={`pr-4 pl-4 ${appStyles.page}`}>
          <AppHeader />
          <main className={`${appStyles.main}`}>
            <Switch location={background || location}>
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
              <ProtectedRoute exact path="/profile">
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute exact path="/profile/orders">
                <Profile />
              </ProtectedRoute>
              <Route path='/ingredients/:ingredientId' exact>
                <div className={appStyles.ingridient}>
                  <IngredientDetails />
                </div>
              </Route>
            </Switch>

            {background && (
              <Route
                path='/ingredients/:ingredientId'
                children={
                  <Modal
                    title='Детали ингридиента'
                    opened={currentIngridientDetails._id ? true : false}
                    onClose={closePopupIngridientDetails}
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
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



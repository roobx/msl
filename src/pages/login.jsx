import { useState, useRef, useCallback, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import pagesStyles from './pages.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  signIn,
  getUser
} from '../services/actions/current-user';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router";
import './pages.css';

function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [emailValue, setEmailValue] = useState('');
  const inputEmailRef = useRef(null);
  const [passwordValue, setPasswordValue] = useState('');
  const inputPasswordRef = useRef(null);

  const { currentUser } = useSelector(state => state.currentUser);

  const onSubmitLogin = useCallback((e) => {
    e.preventDefault();
    dispatch(signIn(emailValue, passwordValue));
  }, [dispatch, emailValue, passwordValue]);
  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (currentUser.email) {
    return <Redirect
      to={location?.state?.from || '/'}
    />
  }

  return (
    <form onSubmit={onSubmitLogin} className={pagesStyles.form}>
      <p className={`text text_type_main-medium ${pagesStyles.title}`}>Вход</p>
      <Input
        type={'text'}
        placeholder={'E-mail'}
        onChange={e => setEmailValue(e.target.value)}
        value={emailValue}
        name={'email'}
        error={false}
        ref={inputEmailRef}
        errorText={'Ошибка'}
      />
      <PasswordInput
        onChange={e => setPasswordValue(e.target.value)}
        value={passwordValue}
        name={'password'}
      />
      <div className={`mb-20 ${pagesStyles.button_container}`}>
        <Button
          type="primary"
          size="medium"
        >
          {!currentUser.signInRequest ? 'Вход' : '...Взлетаем!'}
        </Button>
      </div>
      <div className={pagesStyles.text_container}>
        <p className={`text text_type_main-default text_color_inactive ${pagesStyles.text}`}>
          Вы — новый пользователь?
        </p>
        <Link
          to='/register'
          className={pagesStyles.link}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={pagesStyles.text_container}>
        <p className={`text text_type_main-default text_color_inactive ${pagesStyles.text}`}>
          Забыли пароль?
        </p>
        <Link
          to='/forgot-password'
          className={pagesStyles.link}
        >
          Восстановить пароль
        </Link>
      </div>

    </form>
  );
}

export default Login;
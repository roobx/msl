import { useState, useRef, useCallback, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  register,
  getUser
} from '../services/actions/current-user';
import pagesStyles from './pages.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import './pages.css';

function Register() {
  const dispatch = useDispatch();

  const [emailRegisterValue, setEmailRegisterValue] = useState('');
  const inputEmailRegisterRef = useRef(null);
  const [nameRegisterValue, setNameRegisterValue] = useState('');
  const inputNameRegisterRef = useRef(null);
  const [passwordRegisterValue, setPasswordRegisterValue] = useState('');
  const inputPasswordRegisterRef = useRef(null);


  const { currentUser } = useSelector(state => state.currentUser);

  const onSubmitRegister = useCallback((e) => {
    e.preventDefault();
    dispatch(register(nameRegisterValue, emailRegisterValue, passwordRegisterValue));
  }, [dispatch, nameRegisterValue, emailRegisterValue, passwordRegisterValue]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (currentUser.email) {
    return <Redirect
      to={{
        pathname: '/'
      }}
    />
  }

  return (
    <form onSubmit={onSubmitRegister} className={pagesStyles.form}>
      <p className={`text text_type_main-medium ${pagesStyles.title}`}>Регистрация</p>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setNameRegisterValue(e.target.value)}
        value={nameRegisterValue}
        name={'name'}
        error={false}
        ref={inputNameRegisterRef}
        errorText={'Ошибка'}
      />
      <Input
        type={'text'}
        placeholder={'E-mail'}
        onChange={e => setEmailRegisterValue(e.target.value)}
        value={emailRegisterValue}
        name={'email'}
        error={false}
        ref={inputEmailRegisterRef}
        errorText={'Ошибка'}
      />
      <PasswordInput
        onChange={e => setPasswordRegisterValue(e.target.value)}
        value={passwordRegisterValue}
        name={'password'}
      />
      <div className={`mb-20 ${pagesStyles.button_container}`}>
        <Button
          type="primary"
          size="medium"
        >
          Зарегистрироваться
        </Button>
      </div>
      <div className={pagesStyles.text_container}>
        <p className={`text text_type_main-default text_color_inactive ${pagesStyles.text}`}>
          Уже зарегистрированы?
        </p>
        <Link
          to='/login'
          className={pagesStyles.link}
        >
          Войти
        </Link>
      </div>
    </form>
  );
}

export default Register;
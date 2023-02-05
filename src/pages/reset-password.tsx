import { useState, useRef, useCallback, useEffect, FC } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from '../services/hooks';
import pagesStyles from './pages.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  sentResetPassword,
  getUser
} from '../services/actions/current-user';
import './pages.css';
import { Button } from '../../src/components/ui-yandex/ui-yandex';


const ResetPassword: FC = () => {
  const dispatch = useDispatch();

  const [passwordResetValue, setPasswordResetValue] = useState<string>('');
  const inputEmailResetRef = useRef<HTMLInputElement>(null);

  const [codeResetValue, setCodeResetValue] = useState<string>('');
  const inputCodeResetRef = useRef<HTMLInputElement>(null);

  const { currentUser } = useSelector((state) => state.currentUser)

  const onSubmitReset = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sentResetPassword(passwordResetValue, codeResetValue));
  }, [dispatch, passwordResetValue, codeResetValue]);

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

  if (!currentUser.email && !currentUser.resetEmailSucces) {
    return <Redirect
      to={{
        pathname: '/forgot-password'
      }}
    />
  }

  return (
    <form onSubmit={onSubmitReset} className={pagesStyles.form}>
      <p className={`text text_type_main-medium ${pagesStyles.title}`}>Восстановление пароля</p>

      <Input
        type={'text'}
        placeholder={'Введите новый пароль'}
        onChange={e => setPasswordResetValue(e.target.value)}
        value={passwordResetValue}
        name={'name'}
        error={false}
        ref={inputEmailResetRef}
        errorText={'Ошибка'}
      />

      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={e => setCodeResetValue(e.target.value)}
        value={codeResetValue}
        name={'name'}
        error={false}
        ref={inputCodeResetRef}
        errorText={'Ошибка'}
      />

      <div className={`mb-20 ${pagesStyles.button_container}`}>
        <Button
          type="primary"
          size="medium"
          htmlType='submit'
        >
          {!currentUser.resetPasswordRequest ? 'Сохранить' : '...Сохраняем'}

        </Button>
      </div>
      <div className={pagesStyles.text_container}>
        <p className={`text text_type_main-default text_color_inactive ${pagesStyles.text}`}>
          Вспомнили пароль?
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

export default ResetPassword;
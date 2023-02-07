import { useState, useRef, useCallback, useEffect, FC } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import pagesStyles from './pages.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  sentResetEmail,
  getUser
} from '../services/actions/current-user';
import './pages.css';
import { Button } from '../../src/components/ui-yandex/ui-yandex';

const ForgotPassword: FC = () => {

  const dispatch = useDispatch();

  const [emailForgotValue, setEmailForgotValue] = useState<string>('');
  const inputEmailForgotRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useSelector((state) => state.currentUser);

  const onSubmitForgot = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sentResetEmail(emailForgotValue));

  }, [dispatch, emailForgotValue]);

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


  if (!currentUser.email && currentUser.resetEmailSucces) {
    return <Redirect
      to={{
        pathname: '/reset-password'
      }}
    />
  }


  return (
    <form onSubmit={onSubmitForgot} className={pagesStyles.form}>
      <p className={`text text_type_main-medium ${pagesStyles.title}`}>Восстановление пароля</p>

      <Input
        type={'text'}
        placeholder={'Укажите e-mail'}
        onChange={e => setEmailForgotValue(e.target.value)}
        value={emailForgotValue}
        name={'name'}
        error={currentUser.resetEmailFailed}
        ref={inputEmailForgotRef}
        errorText={'Ошибка'}
      />

      <div className={`mb-20 ${pagesStyles.button_container}`}>
        <Button
          type="primary"
          size="medium"
          htmlType='submit'
        >
          {!currentUser.resetEmailRequest ? 'Восстановить' : '...Отправляем письмо'}
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

export default ForgotPassword;
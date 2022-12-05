import { useState, useCallback, useEffect, FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
  updateUser,
  exit
} from '../services/actions/current-user';
import pagesStyles from './pages.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import './pages.css';

const Pofile: FC = () => {
  const dispatch = useDispatch<any>();

  const currentUser = useSelector((state: any) => state.currentUser.currentUser);

  const [emailProfileValue, setEmailProfileValue] = useState<string>('');

  const [nameProfileValue, setNameProfileValue] = useState<string>('');

  const [passwordProfileValue, setPasswordProfileValue] = useState<string>('');

  useEffect(() => {

    dispatch(getUser());

  }, []);

  useEffect(() => {
    setNameProfileValue(currentUser.name);
    setEmailProfileValue(currentUser.email);

  }, [currentUser]);

  const onUndoCallback = useCallback((e: any) => {
    e.preventDefault();
    setNameProfileValue(currentUser.name);
    setEmailProfileValue(currentUser.email);
    setPasswordProfileValue('');
  }, [currentUser]);

  const onSaveCallback = useCallback((e: any) => {
    e.preventDefault();
    dispatch(updateUser(emailProfileValue, nameProfileValue, passwordProfileValue));
  }, [emailProfileValue, nameProfileValue, passwordProfileValue]);

  const onExitCallback = useCallback((e: any) => {
    e.preventDefault();
    dispatch(exit());
  }, []);


  return (
    <div>
      <div className={pagesStyles.profile}>
        <ul className={pagesStyles.profile_links}>
          <li>
            <NavLink
              exact to='/profile'
              className={`text text_type_main-medium ${pagesStyles.profile_link}`}
              activeClassName={pagesStyles.profile_link_active}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              exact to='/profile/orders'
              className={`text text_type_main-medium ${pagesStyles.profile_link}`}
              activeClassName={pagesStyles.profile_link_active}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <button
              onClick={onExitCallback}
              className={`text text_type_main-medium ${pagesStyles.profile_exit}`}
            >
              Выход
            </button>
          </li>
        </ul>
        <div className={pagesStyles.form}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setNameProfileValue(e.target.value)}
            value={nameProfileValue}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            icon="EditIcon"
          />
          <Input
            type={'text'}
            placeholder={'E-mail'}
            onChange={e => setEmailProfileValue(e.target.value)}
            value={emailProfileValue}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            icon="EditIcon"
          />
          <PasswordInput
            onChange={e => setPasswordProfileValue(e.target.value)}
            value={passwordProfileValue}
            name={'password'}
          />
          {(emailProfileValue !== currentUser.email || nameProfileValue !== currentUser.name || passwordProfileValue) &&
            (<div className={`mb-20 ${pagesStyles.button_container}`}>
              <div className='mr-4'>
                <Button
                  onClick={onUndoCallback}
                  type="primary"
                  size="medium"
                  htmlType='button'
                >
                  Отменить
                </Button>
              </div>

              <Button
                onClick={onSaveCallback}
                type="primary"
                size="medium"
                htmlType='button'
              >
                Сохранить
              </Button>
            </div>)}
        </div>

      </div>
      <p className={`text text_type_main-default text_color_inactive ${pagesStyles.text_footer_profile}`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}

export default Pofile;
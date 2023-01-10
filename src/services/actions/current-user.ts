import { url } from '../../utils/consts';
import { checkResponse, setTokens, getCookie, deleteCookie } from '../../utils/utils';
import {
  IUser,
  AppThunk
} from '../../utils/types';

import {
  SENT_RESET_EMAIL,
  SENT_RESET_EMAIL_SUCCES,
  SENT_RESET_EMAIL_FAILED,
  SENT_RESET_PASSWORD,
  SENT_RESET_PASSWORD_SUCCES,
  SENT_RESET_PASSWORD_FAILED,
  SIGNIN,
  SIGNIN_SUCCES,
  SIGNIN_FAILED,
  REGISTER,
  REGISTER_SUCCES,
  REGISTER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCES,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCES,
  UPDATE_USER_FAILED,
  EXIT_REQUEST,
  EXIT_SUCCES,
  EXIT_FAILED
} from '../constants/current-user';


export interface ISentResetEmail {
  readonly type: typeof SENT_RESET_EMAIL;
}

export interface ISentResetEmailSucces {
  readonly type: typeof SENT_RESET_EMAIL_SUCCES;
}

export interface ISentResetEmailFailed {
  readonly type: typeof SENT_RESET_EMAIL_FAILED;
}

export interface ISentResetPassword {
  readonly type: typeof SENT_RESET_PASSWORD;
}

export interface ISentResetPasswordSucces {
  readonly type: typeof SENT_RESET_PASSWORD_SUCCES;
}

export interface ISentResetPasswordFailed {
  readonly type: typeof SENT_RESET_PASSWORD_FAILED;
}

export interface ISignIn {
  readonly type: typeof SIGNIN;
}

export interface ISignInSucces {
  readonly type: typeof SIGNIN_SUCCES;
  readonly user: IUser;
}

export interface ISignInFailed {
  readonly type: typeof SIGNIN_FAILED;
}

export interface IRegister {
  readonly type: typeof REGISTER;
}

export interface IRegisterSucces {
  readonly type: typeof REGISTER_SUCCES;
  readonly user: IUser;
}

export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserRequestSucces {
  readonly type: typeof GET_USER_SUCCES;
  readonly user: IUser;
}

export interface IGetUserRequestFailed {
  readonly type: typeof GET_USER_FAILED;
  readonly payload: string;
}

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserRequestSucces {
  readonly type: typeof UPDATE_USER_SUCCES;
  readonly user: IUser;
}

export interface IUpdateUserRequestFailed {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly payload: string;
}

export interface IExitRequest {
  readonly type: typeof EXIT_REQUEST;
}

export interface IExitSucces {
  readonly type: typeof EXIT_SUCCES;
}

export interface IExitFailed {
  readonly type: typeof EXIT_FAILED;
  readonly payload: string;
}


export type TCurrentUserActions =
  | ISentResetEmail
  | ISentResetEmailSucces
  | ISentResetEmailFailed
  | ISentResetPassword
  | ISentResetPasswordSucces
  | ISentResetPasswordFailed
  | ISignIn
  | ISignInSucces
  | ISignInFailed
  | IRegister
  | IRegisterSucces
  | IRegisterFailed
  | IGetUserRequest
  | IGetUserRequestSucces
  | IGetUserRequestFailed
  | IGetUserRequest
  | IGetUserRequestSucces
  | IGetUserRequestFailed
  | IUpdateUserRequest
  | IUpdateUserRequestSucces
  | IUpdateUserRequestFailed
  | IExitRequest
  | IExitSucces
  | IExitFailed;


export const sentResetEmail = (email: string): AppThunk => {
  return (dispatch) => {
    dispatch({
      type: SENT_RESET_EMAIL
    });
    fetch(`${url}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        email: email
      })
    })
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: SENT_RESET_EMAIL_SUCCES,
        });
      })
      .catch(err => {

        dispatch({
          type: SENT_RESET_EMAIL_FAILED
        })
      })
  }
};


export const sentResetPassword = (email: string, token: string): AppThunk => {
  return (dispatch) => {
    dispatch({
      type: SENT_RESET_PASSWORD
    });
    fetch(`${url}password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        email: email,
        token: token
      })
    })
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: SENT_RESET_PASSWORD_SUCCES,
        });
      })
      .catch(err => {

        dispatch({
          type: SENT_RESET_PASSWORD_FAILED
        })
      })
  }
};


export const signIn = (email: string, password: string): AppThunk => {

  return (dispatch) => {
    dispatch({
      type: SIGNIN
    });
    fetch(`${url}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: SIGNIN_SUCCES,
          user: res.user
        });
        setTokens(res.accessToken, res.refreshToken)

      })
      .catch(err => {

        dispatch({
          type: SIGNIN_FAILED
        })
      })
  }

};


export const register = (name: string, email: string, password: string): AppThunk => {

  return (dispatch) => {
    dispatch({
      type: REGISTER
    });
    fetch(`${url}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(checkResponse)
      .then(res => {
        dispatch({
          type: REGISTER_SUCCES,
          user: res.user
        });
        setTokens(res.accessToken, res.refreshToken)
      })
      .catch(err => {

        dispatch({
          type: REGISTER_FAILED
        })
      })
  }

};

export const getUser = (): AppThunk => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });

    fetch(`${url}auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${getCookie('accessToken')}`
      }
    })
      .then(
        (res) => {

          return res.json();

        }
      )
      .then((res) => {

        if (res.message === 'jwt expired') {
          dispatch(refreshToken(getUser()));
        }
        if (res.success) {
          dispatch({
            type: GET_USER_SUCCES,
            user: res.user,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
          payload: err.message,
        });
      });
  }

};

export const updateUser = (email: string, name: string, password: string): AppThunk => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });

    fetch(`${url}auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `${getCookie('accessToken')}`,
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password
      })
    })
      .then(
        (res) => {

          return res.json();
        }
      )
      .then((res) => {

        if (res.message === 'jwt expired') {
          dispatch(refreshToken(updateUser(email, name, password)));
        }
        if (res.success) {
          dispatch({
            type: UPDATE_USER_SUCCES,
            user: res.user,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_FAILED,
          payload: err.message,
        });
      });
  }

};

export const exit = (): AppThunk => {
  return (dispatch) => {
    dispatch({
      type: EXIT_REQUEST,
    });

    fetch(`${url}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': `${getCookie('accessToken')}`
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: EXIT_SUCCES,
        });
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .catch((err) => {
        dispatch({
          type: EXIT_FAILED,
          payload: err.message,
        });
      });
  }

};

const refreshToken = (afterRefresh: any): AppThunk => {
  return (dispatch) => {
    fetch(`${url}auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(checkResponse)
      .then((res) => {
        setTokens(res.accessToken, res.refreshToken);
        dispatch(afterRefresh());
      })
      .catch(err => console.log(err))
  }

};


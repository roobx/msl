import { url } from '../../utils/consts.ts';
import { checkResponse, setTokens, getCookie, deleteCookie } from '../../utils/utils';

export const SENT_RESET_EMAIL = 'SENT_RESET_EMAIL';
export const SENT_RESET_EMAIL_SUCCES = 'SENT_RESET_EMAIL_SUCCES';
export const SENT_RESET_EMAIL_FAILED = 'SENT_RESET_EMAIL_FAILED';

export const SENT_RESET_PASSWORD = 'SENT_RESET_PASSWORD';
export const SENT_RESET_PASSWORD_SUCCES = 'SENT_RESET_PASSWORD_SUCCES';
export const SENT_RESET_PASSWORD_FAILED = 'SENT_RESET_PASSWORD_FAILED';

export const SIGNIN = 'SIGNIN';
export const SIGNIN_SUCCES = 'SIGNIN_SUCCES';
export const SIGNIN_FAILED = 'SIGNIN_FAILED';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCES = 'REGISTER_SUCCES';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCES = 'GET_USER_SUCCES';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCES = 'UPDATE_USER_SUCCES';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const EXIT_REQUEST = 'EXIT_REQUEST';
export const EXIT_SUCCES = 'EXIT_SUCCES';
export const EXIT_FAILED = 'EXIT_FAILED';

export function sentResetEmail(email) {
  return function (dispatch) {
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
}

export function sentResetPassword(email, token) {
  return function (dispatch) {
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
}

export function signIn(email, password) {
  return function (dispatch) {
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
}

export function register(name, email, password) {
  return function (dispatch) {
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
}



export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });

    fetch(`${url}auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken')
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

export function updateUser(email, name, password) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });

    fetch(`${url}auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken')
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
          dispatch(refreshToken(updateUser()));
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

export function exit() {
  return function (dispatch) {
    dispatch({
      type: EXIT_REQUEST,
    });

    fetch(`${url}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken')
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

const refreshToken = (afterRefresh) => (dispatch) => {
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
};


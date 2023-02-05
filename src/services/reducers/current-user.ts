import {
  SENT_RESET_EMAIL,
  SENT_RESET_EMAIL_FAILED,
  SENT_RESET_EMAIL_SUCCES,
  SENT_RESET_PASSWORD,
  SENT_RESET_PASSWORD_FAILED,
  SENT_RESET_PASSWORD_SUCCES,
  SIGNIN_FAILED,
  SIGNIN_SUCCES,
  SIGNIN,
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
import {
  ICurrentUser
} from '../../utils/types';
import { TCurrentUserActions } from '../actions/current-user';

type TCurrentUserState = {
  currentUser: ICurrentUser;
}

const initialState: TCurrentUserState = {
  currentUser: {
    email: '',
    name: '',
    resetEmailRequest: false,
    resetEmailFailed: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetEmailSucces: false,
    signInRequest: false,
    signInFailed: false,
    registerRequest: false,
    registerFailed: false,
    getUserRequest: false,
    getUserFailed: false,
    exitRequest: false,
    exitFailed: false,
  }
}

export const currentUserReducer = (state = initialState, action: TCurrentUserActions) => {
  switch (action.type) {
    case SENT_RESET_EMAIL: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          resetEmailRequest: true,
          resetEmailFailed: false,
          resetPasswordFailed: false
        }
      };
    }

    case SENT_RESET_EMAIL_SUCCES: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          resetEmailRequest: false,
          resetEmailFailed: false,
          resetEmailSucces: true,
        }
      };
    }

    case SENT_RESET_EMAIL_FAILED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          resetEmailRequest: false,
          resetEmailFailed: true,
        }
      };
    }

    case SENT_RESET_PASSWORD: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          resetPasswordRequest: true,
          resetPasswordFailed: false,
          resetEmailSucces: false,
        }
      };
    }

    case SENT_RESET_PASSWORD_SUCCES: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          resetPasswordRequest: false,
          resetPasswordFailed: false,
        }
      };
    }

    case SENT_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          resetPasswordRequest: false,
          resetPasswordFailed: true,
        }
      };
    }

    case SIGNIN: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          signInRequest: true,
          signInFailed: false,
        }
      };
    }

    case SIGNIN_SUCCES: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          signInRequest: false,
          signInFailed: false,
          name: action.user.name,
          email: action.user.email,
        }
      };
    }

    case SIGNIN_FAILED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          signInRequest: false,
          signInFailed: true,
        }
      };
    }

    case REGISTER: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          registerRequest: true,
          registerFailed: false,
        }
      };
    }

    case REGISTER_SUCCES: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          registerRequest: false,
          registerFailed: false,
          name: action.user.name,
          email: action.user.email,
        }
      };
    }

    case REGISTER_FAILED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          registerRequest: false,
          registerFailed: true,
        }
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          getUserRequest: true,
          getUserFailed: false,
        }
      };
    }

    case GET_USER_SUCCES: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          getUserRequest: false,
          getUserFailed: false,
          name: action.user.name,
          email: action.user.email,
        }
      };
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          getUserRequest: false,
          getUserFailed: true,
        }
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          updateUserRequest: true,
          updateUserFailed: false,
        }
      };
    }

    case UPDATE_USER_SUCCES: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          updateUserRequest: false,
          updateUserFailed: false,
          name: action.user.name,
          email: action.user.email,
        }
      };
    }

    case UPDATE_USER_FAILED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          updateUserRequest: false,
          updateUserFailed: true,
        }
      };
    }

    case EXIT_REQUEST: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          exitRequest: true,
          exitFailed: false,
        }
      };
    }

    case EXIT_SUCCES: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          resetEmailRequest: false,
          resetEmailFailed: false,
          resetPasswordRequest: false,
          resetPasswordFailed: false,
          resetEmailSucces: false,
          signInRequest: false,
          signInFailed: false,
          registerRequest: false,
          registerFailed: false,
          getUserRequest: false,
          getUserFailed: false,
          exitRequest: false,
          exitFailed: false,
          name: '',
          email: '',
        }
      };
    }

    case EXIT_FAILED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          exitRequest: false,
          exitFailed: true,
        }
      };
    }

    default:
      return state;
  }
}
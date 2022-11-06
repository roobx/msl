import {
  GET_INGRIDIENTS,
  GET_INGRIDIENTS_SUCCES,
  GET_INGRIDIENTS_FAILED,
  ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS,
  SHOW_INGRIDIENT_DETAILS,
  HIDE_INGRIDIENT_DETAILS,
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_SUCCES,
  GET_ORDER_NUMBER_FAILED,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS,
  SET_BUN_ID,
  DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS,
  DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS,
  CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS,
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
} from '../actions/actions';


const initialState = {
  ingridientsRequest: false,
  ingridientsFailed: false,
  ingridients: [],
  selectedConstructorIngridients: [],
  currentIngridientDetails: {},
  orderNumberRequest: false,
  orderNumberFailed: false,
  orderNumber: '',
  orderDetailsOpened: false,
  selectedItems: [],
  bunId: null,
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

export const ingridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGRIDIENTS: {
      return {
        ...state,
        ingridientsRequest: true
      };
    }
    case GET_INGRIDIENTS_SUCCES: {
      return {
        ...state,
        ingridients: action.ingridients,
        ingridientsRequest: false
      };
    }
    case GET_INGRIDIENTS_FAILED: {
      return {
        ...state,
        ingridientsRequest: false,
        ingridientsFailed: true
      };
    }
    default:
      return state;
  }
}

export const constuctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS: {
      return {
        ...state,
        selectedConstructorIngridients:
          [...state.selectedConstructorIngridients,
          action.id,
          ],
        selectedItems: [
          ...state.selectedItems,
          action.item
        ]
      };
    }
    case DELETE_SELECTED_CONSTRUCTOR_INGRIDIENTS: {
      return {
        ...state,
        selectedConstructorIngridients: action.newIngridientsId,
        selectedItems: action.newIngridientsIdSelectedItems
      }
    }

    case DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS: {
      return {
        ...state,
        selectedConstructorIngridients: action.newIngridientsId,
        selectedItems: action.newSelectedItems

      }
    }
    case CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS: {
      return {
        ...state,
        selectedConstructorIngridients: [],
        bunId: '',
        selectedItems: []
      }
    }
    case SET_BUN_ID: {
      return {
        ...state,
        bunId: action.id
      };
    }
    default:
      return state;
  }
}

export const currentIngridientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_INGRIDIENT_DETAILS: {
      return {
        ...state,
        currentIngridientDetails: action.currentIngridient
      };
    }
    case HIDE_INGRIDIENT_DETAILS: {
      return {
        ...state,
        currentIngridientDetails: {}
      };
    }
    default:
      return state;
  }
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumberRequest: true
      };
    }
    case GET_ORDER_NUMBER_SUCCES: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderNumberRequest: false
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: true
      };
    }
    case OPEN_ORDER_DETAILS: {
      return {
        ...state,
        orderDetailsOpened: true,
      };
    }
    case CLOSE_ORDER_DETAILS: {
      return {
        ...state,
        orderNumber: '',
        orderDetailsOpened: false,
      };
    }

    default:
      return state;
  }
}

export const currentUserReducer = (state = initialState, action) => {
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
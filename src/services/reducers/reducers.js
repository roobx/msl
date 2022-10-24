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
  CLEAR_SELECTED_CONSTRUCTOR_INGRIDIENTS
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
      return state
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
        selectedItems: action.newIngridientsId.map(item => state.selectedItems.find(i => i._id === item))
      }
    }

    case DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS: {
      return {
        ...state,
        selectedConstructorIngridients: action.newIngridientsId,
        selectedItems: action.newIngridientsId.map(item => state.selectedItems.find(i => i._id === item))
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
      return state
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
      return state
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
      return state
  }
}
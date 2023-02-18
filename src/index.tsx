import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import { socketMiddleware } from './services/middleware/socket-middleware';
import { wsActions } from './utils/types';
import { createRoot } from 'react-dom/client';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer);

const root = createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


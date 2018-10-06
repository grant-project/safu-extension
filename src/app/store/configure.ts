import { Store, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';
// import { persistStore } from 'redux-persist';
import rootReducer, { AppState, combineInitialState } from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger');
    const logger = createLogger({
      collapsed: true,
    });
    middleware = [...middleware, logger];
  }
  return composeWithDevTools(applyMiddleware(...middleware));
};

export function configureStore(initialState: Partial<AppState> = combineInitialState) {
  const store: Store<AppState> = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware]),
  );
  // const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./reducers', () =>
        store.replaceReducer(require('./reducers').default),
      );
    }
  }

  return { store, persistor: null };
}

import '@babel/polyfill';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
// import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from 'store/configure';
import Routes from './Routes';

const initialState = window && (window as any).__PRELOADED_STATE__;
const { store, /* persistor */ } = configureStore(initialState);

const App = hot(module)(() => (
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
    {/* </PersistGate> */}
  </Provider>
));

export default App;
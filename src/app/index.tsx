import '@babel/polyfill';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import SyncGate from 'components/SyncGate';
import { configureStore } from 'store/configure';
import Routes from './Routes';

const initialState = window && (window as any).__PRELOADED_STATE__;
const { store, /* persistor */ } = configureStore(initialState);

const App = hot(module)(() => (
  <Provider store={store}>
    <SyncGate>
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
    </SyncGate>
  </Provider>
));

export default App;
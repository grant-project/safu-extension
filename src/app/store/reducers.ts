// tslint:disable no-empty-interface
import { combineReducers } from 'redux';
import { routerReducer as routing, RouterState } from 'react-router-redux'
import crypto, { CryptoState, INITIAL_STATE as cryptoInitialState } from 'modules/crypto';

export interface AppState {
  crypto: CryptoState;
  routing: RouterState;
}

export const combineInitialState: Partial<AppState> = {
  crypto: cryptoInitialState,
};

export default combineReducers<AppState>({
  crypto,
  routing,
});

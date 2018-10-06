// tslint:disable no-empty-interface
import { combineReducers } from 'redux';
import crypto, { CryptoState, INITIAL_STATE as cryptoInitialState } from 'modules/crypto';

export interface AppState {
  crypto: CryptoState;
}

export const combineInitialState: Partial<AppState> = {
  crypto: cryptoInitialState,
};

export default combineReducers<AppState>({
  crypto,
});

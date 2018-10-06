// tslint:disable no-empty-interface
import { combineReducers } from 'redux';
import crypto, { CryptoState, INITIAL_STATE as cryptoInitialState } from 'modules/crypto';
import addresses, { AddressesState, INITIAL_STATE as addressesInitialState } from 'modules/addresses';
import sync, { SyncState, INITIAL_STATE as syncInitialState } from 'modules/sync';

export interface AppState {
  crypto: CryptoState;
  addresses: AddressesState;
  sync: SyncState;
}

export const combineInitialState: Partial<AppState> = {
  crypto: cryptoInitialState,
  addresses: addressesInitialState,
  sync: syncInitialState,
};

export default combineReducers<AppState>({
  crypto,
  addresses,
  sync,
});

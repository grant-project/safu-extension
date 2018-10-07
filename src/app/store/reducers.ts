// tslint:disable no-empty-interface
import { combineReducers } from 'redux';
import crypto, { CryptoState, INITIAL_STATE as cryptoInitialState } from 'modules/crypto';
import addresses, {
  AddressesState,
  INITIAL_STATE as addressesInitialState,
} from 'modules/addresses';
import sync, { SyncState, INITIAL_STATE as syncInitialState } from 'modules/sync';
import balances, {
  BalancesState,
  INITIAL_STATE as balancesInitialState,
} from 'modules/balances';
import rates, { RatesState, INITIAL_STATE as ratesInitialState } from 'modules/rates';

export interface AppState {
  crypto: CryptoState;
  addresses: AddressesState;
  sync: SyncState;
  balances: BalancesState;
  rates: RatesState;
}

export const combineInitialState: Partial<AppState> = {
  crypto: cryptoInitialState,
  addresses: addressesInitialState,
  sync: syncInitialState,
  balances: balancesInitialState,
  rates: ratesInitialState,
};

export default combineReducers<AppState>({
  crypto,
  addresses,
  sync,
  balances,
  rates,
});

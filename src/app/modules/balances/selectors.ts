import { AppState } from 'store/reducers';

export function getBalances(s: AppState) {
  return s.balances;
}

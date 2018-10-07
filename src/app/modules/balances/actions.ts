import { BALANCES, BalanceMap } from './types';

export const getBalancesRequested = () => ({ type: BALANCES.REQUESTED });
export const getBalancesFailed = () => ({ type: BALANCES.FAILED });
export const getBalancesSucceeded = (payload: BalanceMap) => ({
  type: BALANCES.SUCCEEDED,
  payload,
});

import BN from 'bn.js';

export enum BALANCES {
  REQUESTED = 'REQUESTED',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export interface TokenWithBalance {
  symbol: string;
  address: string;
  balance: BN;
  decimals: number;
}

export interface BalanceMap {
  [address: string]: TokenMap;
}

export interface TokenMap {
  [tokenSymbol: string]: TokenWithBalance;
}

export type BalancesState = BalanceMap;

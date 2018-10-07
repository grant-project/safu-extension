import { SagaIterator } from 'redux-saga';
import { takeLatest, put, select, apply } from 'redux-saga/effects';
import { BALANCES, TokenWithBalance, TokenMap, BalanceMap } from './types';
import { getAllAddresses } from 'modules/addresses/selectors';
import addressesTypes from 'modules/addresses/types';
const { abi, address : contractAddress } = require('./getBalances.abi.json');
const tokensJson = require('./tokens.json');
import BN from 'bn.js'
import Web3 from 'web3';
import { getBalancesSucceeded, getBalancesFailed } from 'modules/balances/actions';

type ExtPromise<T> = T extends Promise<infer U> ? U : T;

interface BalanceContract {
  balances(
    userAddresses: string[],
    tokenAddress: string[],
  ): Promise<BN[]>;
}

const web3 = new Web3(new Web3.providers.HttpProvider('https://api.mycryptoapi.com/eth'))
const balanceContract = new web3.eth.Contract(
  abi,
  contractAddress,
) as any;


function hydrateBalancesPerAddress(
  addressesLen: number,
  tokens: typeof tokensJson,
  result: ExtPromise<ReturnType<BalanceContract['balances']>>,
) {
  // [1,2,3,1,2,3 ]
  // 2 address, 3 token addrs
  const arr: TokenWithBalance[][] = [];
  for (let i = 0; i < addressesLen; i++) {
    // [[1,2,3] , [1,2,3] ]
    arr.push([]);
    for (let j = 0; j < tokens.length; j++) {
      // uint[] memory addrBalances = new uint[](tokens.length * users.length);
      //         uint addrIdx = j + tokens.length * i;

      const token = tokens[j];
      const flatIdx = j + tokens.length * i;
      const balance = new BN(result[flatIdx]);

      if (token.symbol === 'ETH' || !balance.isZero()) {
        const balanceObj = {
          symbol: token.symbol,
          address: token.address,
          balance: balance.toString(),
          decimals: token.decimal,
        };

        arr[i].push(balanceObj);
      }
    }
  }

  // this is the address length
  return arr;
}

function reduceTokensToMap(tokens: TokenWithBalance[]): TokenMap {
  const map: TokenMap = {};
  for (const token of tokens) {
    map[token.symbol] = token;
  }
  return map;
}

function transformBalancesToMap(
  addresses: string[],
  balances: ReturnType<typeof hydrateBalancesPerAddress>,
) {
  const map: BalanceMap = {};
  for (let i = 0; i < balances.length; i++) {
    map[addresses[i]] = reduceTokensToMap(balances[i]);
  }
  return map;
}

export function* fetchBalances(): SagaIterator {
  const addresses: ReturnType<typeof getAllAddresses> = yield select(getAllAddresses);
  const tokenAddresses = tokensJson.map(t => t.address);
  try {
    const method = balanceContract.methods.balances(addresses, tokenAddresses);
    const res: ExtPromise<ReturnType<BalanceContract['balances']>> = yield apply(
      method,
      method.call ,
    );

    const balancesByAddress = hydrateBalancesPerAddress(
      addresses.length,
      tokensJson,
      res,
    );
    const balanceMap = transformBalancesToMap(addresses, balancesByAddress);

    yield put(getBalancesSucceeded(balanceMap));
  } catch (e) {
    yield put(getBalancesFailed());
    throw e;
  }
}

export default function* balancesSagas(): SagaIterator {
  yield takeLatest([
    BALANCES.REQUESTED,
    addressesTypes.ADD_ADDRESS,
  ], fetchBalances);
}

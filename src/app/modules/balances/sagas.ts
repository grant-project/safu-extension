import { SagaIterator } from 'redux-saga';
import { takeLatest, put, select, apply } from 'redux-saga/effects';
import { BALANCES, TokenWithBalance, TokenMap, BalanceMap } from './types';
import { getAllAddresses } from 'modules/addresses/selectors';
import { abi, address as contractAddress } from './getBalances.abi.json';
import tokensJson from './tokens.json';
import ethers from 'ethers';
import { getBalancesSucceeded, getBalancesFailed } from 'modules/balances/actions';

type ExtPromise<T> = T extends Promise<infer U> ? U : T;

interface BalanceContract {
  balances(
    userAddresses: string[],
    tokenAddress: string[],
  ): Promise<ethers.types.BigNumber[]>;
}

const provider = ethers.providers.getDefaultProvider();
const balanceContract: ethers.Contract & BalanceContract = new ethers.Contract(
  contractAddress,
  abi,
  provider,
);

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

      const flatIdx = j + tokens.length * i;
      const balance = result[flatIdx];

      if (!balance.isZero()) {
        const token = tokens[j];

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
    map[token.address] = token;
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
    const res: ExtPromise<ReturnType<BalanceContract['balances']>> = yield apply(
      balanceContract,
      balanceContract.balances,
      [addresses, tokenAddresses],
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
  yield takeLatest(BALANCES.REQUESTED, fetchBalances);
}

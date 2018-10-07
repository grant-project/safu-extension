import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { fetchRates, CCResponse } from '../../api/rates';
import { getBalances } from 'modules/balances/selectors';
import types from './types';
import * as actions from './actions';

export function* fetchCurrentRates(): SagaIterator {
  try {
    const balances = yield select(getBalances);
    const symbolKeys = {} as any;

    Object.values(balances).forEach(b => {
      Object.values(b).forEach(t => {
        symbolKeys[t.symbol] = true;
      });
    });

    const symbols = Object.keys(symbolKeys);
    const rates: CCResponse = yield call(fetchRates, symbols);
    yield put(actions.fetchCCRatesSucceeded(rates));
  } catch (e) {
    console.error('Failed to fetch rates:', e);
    yield put(actions.fetchCCRatesFailed());
    return;
  }
}

export default function* ratesSaga(): SagaIterator {
  yield takeLatest(types.CC_REQUESTED, fetchCurrentRates);
}
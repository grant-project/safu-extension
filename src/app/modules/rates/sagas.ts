import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { fetchRates, CCResponse } from '../../api/rates';
// import * as types from './types';
import * as actions from './actions';

export default function* fetchRatesSaga(): SagaIterator {
  try {
    // TODO allow other kinds
    const rates: CCResponse = yield call(fetchRates, ['ETH']);
    yield put(actions.fetchCCRatesSucceeded(rates));
  } catch (e) {
    console.error('Failed to fetch rates:', e);
    yield put(actions.fetchCCRatesFailed());
    return;
  }
}


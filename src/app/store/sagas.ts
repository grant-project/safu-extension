import { fork } from 'redux-saga/effects';
import { syncSagas } from 'modules/sync';
import { cryptoSagas } from 'modules/crypto';
import { balancesSagas } from 'modules/balances';
import { ratesSaga } from 'modules/rates';

export default function* rootSaga() {
  yield fork(cryptoSagas);
  yield fork(syncSagas);
  yield fork(ratesSaga);
  yield fork(balancesSagas);
}

import { fork } from 'redux-saga/effects';
import { syncSagas } from 'modules/sync';
import { cryptoSagas } from 'modules/crypto';
import { balancesSagas } from 'modules/balances';
export default function* rootSaga() {
  yield fork(cryptoSagas);
  yield fork(syncSagas);
  yield fork(balancesSagas);
}

import { AppState as S } from 'store/reducers';

export const selectSalt = (s: S) => s.crypto.salt;
export const selectHasSetPassword = (s: S) => s.crypto.hasSetPassword;
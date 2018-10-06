import { AppState as S } from 'store/reducers';

export const selectAddresses = (s: S) => s.addresses.addresses;
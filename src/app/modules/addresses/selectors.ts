import { AppState as S } from 'store/reducers';

export const selectAddresses = (s: S) => s.addresses.addresses;
export const getAllAddresses = (s: S) => selectAddresses(s).map(a => a.address);

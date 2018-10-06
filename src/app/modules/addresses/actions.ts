import types, { AddressConfig } from './types';

export function setAddresses(payload: AddressConfig[]) {
  return {
    type: types.SET_ADDRESSES,
    payload,
  };
}
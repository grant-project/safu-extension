import types, { AddressConfig } from './types';

export function setAddresses(payload: AddressConfig[]) {
  return {
    type: types.SET_ADDRESSES,
    payload,
  };
}

export function addAddress(payload: AddressConfig) {
  return {
    type: types.ADD_ADDRESS,
    payload,
  };
}

export function removeAddress(payload: string) {
  return {
    type: types.REMOVE_ADDRESS,
    payload,
  };
}

export function updateAddress(payload: {
  oldAddress: string;
  newConfig: AddressConfig;
}) {
  return {
    type: types.UPDATE_ADDRESS,
    payload,
  };
}
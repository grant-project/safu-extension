import types, { AddressConfig, AddressSource } from './types';

export interface AddressesState {
  addresses: AddressConfig[];
}

export const INITIAL_STATE: AddressesState = {
  addresses: [],
};

export default function addressesReducer(
  state: AddressesState = INITIAL_STATE,
  action: any
): AddressesState {
  switch (action.type) {
    case types.SET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload,
      };

    case types.ADD_ADDRESS:
      return {
        ...state,
        addresses: [
          ...state.addresses,
          action.payload,
        ],
      };
    
    case types.REMOVE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses
          .filter(a => a.address.toLowerCase() !== action.payload.toLowerCase()),
      };
    
    case types.UPDATE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(a => {
          if (a.address.toLowerCase() === action.payload.oldAddress.toLowerCase()) {
            return action.payload.newConfig;
          }
          return a;
        }),
      };
  }

  return state;
}

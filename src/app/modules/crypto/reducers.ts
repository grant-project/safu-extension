import types from './types';

export interface CryptoState {
  salt: null | string;
  hasSetPassword: boolean;
}

export const INITIAL_STATE: CryptoState = {
  salt: null,
  hasSetPassword: false,
};

export default function cryptoReducers(
  state: CryptoState = INITIAL_STATE,
  action: any
): CryptoState {
  switch (action.type) {
    case types.GENERATE_SALT:
      return {
        ...state,
        salt: action.payload,
      }

    case types.SET_PASSWORD:
      return {
        ...state,
        hasSetPassword: true,
      };
  }

  return state;
}

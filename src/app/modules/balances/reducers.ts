import { BalancesState, BALANCES } from 'modules/balances/types';

export default function balancesReducer(state: BalancesState = {}, action: any) {
  switch (action.type) {
    case BALANCES.SUCCEEDED: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}

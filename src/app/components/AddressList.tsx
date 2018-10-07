import React from 'react';
import AddressRow from 'components/AddressRow';
import { AddressConfig } from 'modules/addresses/types';
import { BalanceMap } from 'modules/balances/types';

interface Props {
  addresses: AddressConfig[];
  balances: BalanceMap;
  onClickAddress?(address: AddressConfig): void;
}

export default class AddressList extends React.Component<Props> {
  render() {
    const { addresses, balances, onClickAddress } = this.props;

    let content;
    if (addresses.length) {
      content = addresses.map(a => (
        <AddressRow
          key={a.address}
          address={a}
          balances={balances[a.address]}
          onClick={onClickAddress}
        />
      ));
    } else {
      content = <h1>No addresses yet!</h1>;
    }

    return content;
  }
}
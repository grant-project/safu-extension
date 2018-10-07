import React from 'react';
import AddressRow from 'components/AddressRow';
import { AddressConfig } from 'modules/addresses/types';

interface Props {
  addresses: AddressConfig[];
  onClickAddress?(address: AddressConfig): void;
}

export default class AddressList extends React.Component<Props> {
  render() {
    const { addresses, onClickAddress } = this.props;

    let content;
    if (addresses.length) {
      content = addresses.map(a => (
        <AddressRow key={a.address} address={a} onClick={onClickAddress} />
      ));
    } else {
      content = <h1>No addresses yet!</h1>;
    }

    return content;
  }
}
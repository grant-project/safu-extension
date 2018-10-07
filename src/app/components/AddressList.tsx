import React from 'react';
import AddressRow from 'components/AddressRow';
import { AddressConfig } from 'modules/addresses/types';

interface Props {
  addresses: AddressConfig[];
}

interface State {
  activeAddress: AddressConfig[];
}

export default class AddressList extends React.Component<Props, State> {
  render() {
    const { addresses } = this.props;

    let content;
    if (addresses.length) {
      content = addresses.map(a => (
        <AddressRow key={a.address} address={a} />
      ));
    } else {
      content = <h1>No addresses yet!</h1>;
    }

    return content;
  }
}
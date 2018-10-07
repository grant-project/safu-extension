import React from 'react';
import { connect } from 'react-redux';
import AddressList from 'components/AddressList';
import Header from 'components/Header';
import { AppState } from 'store/reducers';

interface StateProps {
  addresses: AppState['addresses']['addresses'];
}

type Props = StateProps;

class AddressesPage extends React.Component<Props> {
  render() {
    const { addresses } = this.props;
    return (
      <div>
        <Header />
        <AddressList addresses={addresses} />
      </div>
    );
  }
}

export default connect<StateProps, {}, {}, AppState>(
  state => ({
    addresses: state.addresses.addresses,
  }),
)(AddressesPage);

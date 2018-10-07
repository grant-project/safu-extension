import React from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import AddressList from 'components/AddressList';
import AddressDetails from 'components/AddressDetails';
import AddressForm from 'components/AddressForm';
import Header from 'components/Header';
import { AddressConfig } from 'modules/addresses/types';
import { AppState } from 'store/reducers';

interface StateProps {
  addresses: AppState['addresses']['addresses'];
}

type Props = StateProps;

interface State {
  activeAddress: AddressConfig | null;
  isAddingAddress: boolean;
  isEditingAddress: boolean;
}

class AddressesPage extends React.Component<Props, State> {
  state: State = {
    activeAddress: null,
    isAddingAddress: false,
    isEditingAddress: false,
  };

  render() {
    const { addresses } = this.props;
    const { activeAddress, isAddingAddress, isEditingAddress } = this.state;
  
    const isDrawerOpen = activeAddress || isAddingAddress;
    let drawerTitle;
    let drawerContent;
    if (isAddingAddress) {
      drawerTitle = 'Add an address';
      drawerContent = (
        <AddressForm isCreating={true} onClose={this.closeDrawer} />
      );
    } else if (activeAddress && isEditingAddress) {
      drawerTitle = 'Edit address';
      drawerContent = (
        <AddressForm address={activeAddress} onClose={this.toggleEdit} />
      );
    } else if (activeAddress) {
      drawerContent = (
        <AddressDetails address={activeAddress} onEdit={this.toggleEdit} />
      );
    }

    return (
      <div>
        <Header />
        <AddressList
          addresses={addresses}
          onClickAddress={this.setActiveAddress}
        />
        <Drawer
          title={drawerTitle}
          closable
          visible={!!activeAddress || !!isAddingAddress}
          onClose={this.closeDrawer}
          width="88%"
        >
          {drawerContent}
        </Drawer>
      </div>
    );
  }

  private setActiveAddress = (address: AddressConfig) => {
    this.setState({ activeAddress: address });
  };

  private closeDrawer = () => {
    this.setState({
      activeAddress: null,
      isAddingAddress: false,
      isEditingAddress: false,
    });
  };

  private toggleEdit = () => {
    this.setState({ isEditingAddress: !this.state.isEditingAddress });
  };
}

export default connect<StateProps, {}, {}, AppState>(
  state => ({
    addresses: state.addresses.addresses,
  }),
)(AddressesPage);

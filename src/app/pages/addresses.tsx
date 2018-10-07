import React from 'react';
import { connect } from 'react-redux';
import { Drawer, Icon } from 'antd';
import AddressList from 'components/AddressList';
import AddressDetails from 'components/AddressDetails';
import AddressForm from 'components/AddressForm';
import Header from 'components/Header';
import { AddressConfig } from 'modules/addresses/types';
import { addressesActions } from 'modules/addresses';
import { getBalancesRequested } from 'modules/balances/actions';
import { AppState } from 'store/reducers';
import './addresses.less';

interface StateProps {
  addresses: AppState['addresses']['addresses'];
  balances: AppState['balances'];
}

interface DispatchProps {
  removeAddress: typeof addressesActions['removeAddress'];
  getBalancesRequested: typeof getBalancesRequested;
}

type Props = StateProps & DispatchProps;

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

  componentDidMount() {
    this.props.getBalancesRequested();
  }

  render() {
    const { addresses, balances } = this.props;
    const { activeAddress, isAddingAddress, isEditingAddress } = this.state;
  
    console.log(balances);
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
        <AddressDetails
          address={activeAddress}
          balances={balances[activeAddress.address]}
          onEdit={this.toggleEdit}
          onDelete={this.handleDelete}
        />
      );
    }

    return (
      <div className="AddressesPage">
        <Header />
        <AddressList
          addresses={addresses}
          balances={balances}
          onClickAddress={this.setActiveAddress}
        />
        <Drawer
          className="AddressesPage-drawer"
          title={drawerTitle}
          closable
          visible={!!activeAddress || !!isAddingAddress}
          onClose={this.closeDrawer}
          width="88%"
        >
          {drawerContent}
        </Drawer>

        <button className="AddressesPage-add" onClick={this.toggleAdd}>
          <Icon type="plus" />
        </button>
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
  private toggleAdd = () => {
    this.setState({ isAddingAddress: !this.state.isAddingAddress });
  };

  private handleDelete = (address: AddressConfig) => {
    this.props.removeAddress(address.address);
    this.closeDrawer();
  };
}

export default connect<StateProps, DispatchProps, {}, AppState>(
  state => ({
    addresses: state.addresses.addresses,
    balances: state.balances,
  }),
  {
    removeAddress: addressesActions.removeAddress,
    getBalancesRequested,
  }
)(AddressesPage);

import React from 'react';
import { Button, Dropdown, Menu, Icon, Tabs } from 'antd';
import Identicon from 'components/Identicon';
import UnitDisplay from 'components/UnitDisplay';
import TokenRow from './TokenRow';
import { SOURCE_UI } from 'utils/ui';
import { AddressConfig, AddressSource } from 'modules/addresses/types';
import { TokenMap } from 'modules/balances/types';
import MenuIcon from 'static/images/menu.svg';
import './style.less';

interface Props {
  address: AddressConfig;
  balances?: TokenMap;
  onEdit(): void;
  onDelete(address: AddressConfig): void;
}

export default class AddressDetails extends React.Component<Props> {
  render() {
    const { balances } = this.props;
    const { address, label, source } = this.props.address;
    const menu = (
      <Menu>
        <Menu.Item onClick={this.props.onEdit}>
          Edit
        </Menu.Item>
        <Menu.Item onClick={this.onDelete} style={{ color: '#e74c3c' }}>
          Delete
        </Menu.Item>
      </Menu>
    );
    const sourceui = SOURCE_UI[source as AddressSource];
    const SourceIcon = sourceui.icon;

    return (
      <div className="AddressDetails">
        <div className="AddressDetails-top">
          <Identicon className="AddressDetails-top-avatar" address={address} />
          <div className="AddressDetails-top-label">{label}</div>
          <div className="AddressDetails-top-source">
            <SourceIcon
              className="AddressDetails-top-source-icon"
              style={{ fill: sourceui.color, stroke: sourceui.color }}
            />
            {sourceui.label}
          </div>
          <div className="AddressDetails-top-address">
            {address.substr(0, address.length / 2)}
            <br/>
            {address.substr(address.length / 2)}
          </div>

          <Dropdown overlay={menu} trigger={['click']}>
            <Button className="AddressDetails-top-more" shape="circle">
              <MenuIcon className="AddressDetails-top-more-icon" />
            </Button>
          </Dropdown>
        </div>

        <div className="AddressDetails-actions">
          <Button
            className="AddressDetails-actions-button"
            type="ghost"
          >
            <Icon type="qrcode" /> QR Code
          </Button>
          <Button
            className="AddressDetails-actions-button"
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener nofollow"
          >
            <Icon type="select" /> Etherscan
          </Button>
        </div>

        <Tabs className="AddressDetails-tabs" defaultActiveKey="tokens">
          <Tabs.TabPane tab="Token Balances" key="tokens">
            {balances && Object.values(balances).map(token => (
              <TokenRow key={token.address} token={token} />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Transactions" key="transactions">
            <div className="AddressDetails-tabs-missing">
              Coming soon
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }

  private onDelete = () => {
    this.props.onDelete(this.props.address);
  };
}
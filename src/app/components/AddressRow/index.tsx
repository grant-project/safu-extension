import React from 'react';
import Identicon from 'components/Identicon';
import UnitDisplay from 'components/UnitDisplay';
import { AddressConfig } from 'modules/addresses/types';
import { TokenMap } from 'modules/balances/types';
import './style.less';

interface Props {
  address: AddressConfig;
  balances?: TokenMap;
  onClick?(address: AddressConfig): void;
}

export default class AddressRow extends React.Component<Props> {
  render() {
    const { address, balances } = this.props;
    return (
      <div className="AddressRow" onClick={this.handleClick}>
        <div className="AddressRow-avatar">
          <Identicon className="AddressRow-avatar-identicon" address={address.address} />
        </div>
        <div className="AddressRow-info">
          <div className="AddressRow-info-label">
            {address.label}
          </div>
          <div className="AddressRow-info-address">
            {address.address.substr(0, 7)}
            ...
            {address.address.substr(address.address.length - 7)}
          </div>
        </div>
        <div className="AddressRow-balances">
          <div className="AddressRow-balances-balance">
            
            {balances && balances.ETH &&
              <UnitDisplay
                value={balances.ETH.balance}
                displayShortBalance={3}
                symbol="ETH"
              />
            }
          </div>
        </div>
      </div>
    );
  }

  private handleClick = () => {
    const { onClick, address } = this.props;
    if (onClick) {
      onClick(address);
    }
  };
}
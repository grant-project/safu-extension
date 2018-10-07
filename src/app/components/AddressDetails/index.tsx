import React from 'react';
import { Button } from 'antd';
import { AddressConfig } from 'modules/addresses/types';
import './style.less';

interface Props {
  address: AddressConfig;
  onEdit(): void;
}

export default class AddressDetail extends React.Component<Props> {
  render() {
    const { address } = this.props.address;
    return (
      <div className="AddressDetail">
        <div className="AddressDetail-top">
          {address}
        </div>
        <div className="AddressDetail-actions">
          <Button onClick={this.props.onEdit}>
            Edit
          </Button>
          <Button
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener nofollow"
          >
            Etherscan
          </Button>
          <Button type="danger" onClick={this.onDelete}>
            Delete
          </Button>
        </div>
      </div>
    );
  }
}
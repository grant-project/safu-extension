import React from 'react';
import UnitDisplay from 'components/UnitDisplay';
import { TokenWithBalance } from 'modules/balances/types';
import './TokenRow.less';

interface Props {
  token: TokenWithBalance;
}

export default class TokenRow extends React.Component<Props> {
  render() {
    const { token } = this.props;
    return (
      <div className="TokenRow">
        <div className="TokenRow-icon">
          {token.symbol}
        </div>
        <div className="TokenRow-name">
          {token.symbol}
        </div>
        <div className="TokenRow-balance">
          <UnitDisplay
            value={token.balance}
            symbol={token.symbol}
            displayShortBalance={8}
          />
        </div>
      </div>
    )
  }
}
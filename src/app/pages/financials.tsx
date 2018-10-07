import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import BN from 'bn.js';
import BackHeader from 'components/BackHeader';
import UnitDisplay from 'components/UnitDisplay';
import { ratesActions } from 'modules/rates';
import { AppState } from 'store/reducers';

interface StateProps {
  rates: AppState['rates']['rates'];
  balances: AppState['balances'];
}

interface DispatchProps {
  fetchRates: typeof ratesActions['fetchCCRatesRequested'];
}

type Props = StateProps & DispatchProps;

interface TokenData {
  count: number;
  total: BN;
  totalUsd: BN;
}

class FinancialsPage extends React.Component<Props> {
  componentDidMount() {
    if (this.props.balances) {
      this.props.fetchRates();
    }
  }
  
  componentDidUpdate(prevProps: Props) {
    if (this.props.balances !== prevProps.balances) {
      this.props.fetchRates();
    }
  }

  render() {
    const { rates, balances } = this.props;

    let content;
    if (rates && balances) {
      const tokenData: { [symbol: string]: TokenData } = {};
      
      Object.keys(balances).forEach(address => {
        Object.values(balances[address]).forEach(token => {
          if (!rates[token.symbol]) {
            return;
          }

          if (!tokenData[token.symbol]) {
            tokenData[token.symbol] = {
              count: 0,
              total: new BN(0),
              totalUsd: new BN(0),
            };
          }
          tokenData[token.symbol].count++;
          tokenData[token.symbol].total = tokenData[token.symbol].total.add(new BN(token.balance));
          tokenData[token.symbol].totalUsd = tokenData[token.symbol].total.add(
            new BN(token.balance).muln(rates[token.symbol].USD)
          );
        });
      });
      
      content = (
        <div className="FinancialsPage-financials">
          {Object.keys(tokenData).map(symbol => (
            <TokenValue key={symbol} symbol={symbol} data={tokenData[symbol]} />
          ))}
        </div>
      )
    } else {
      content = <Spin size="large" />;
    }

    return (
      <div className="FinancialsPage">
        <BackHeader title="Financial Breakdown" backHref="/" />
        {content}
      </div>
    );
  }
}

const TokenValue = ({ symbol, data }: { symbol: string, data: TokenData }) => (
  <div className="TokenValue">
    <div className="TokenValue-icon">
      {symbol}
    </div>
    <div className="TokenValue-name">
      {symbol}
    </div>
    <div className="TokenValue-balance">
      <div className="TokenValue-balance-usd">
        <UnitDisplay
          unit="ether"
          value={data.totalUsd}
          symbol="$"
          displayShortBalance={2}
        />
      </div>
      <div className="TokenValue-balance-token">
        <UnitDisplay
          unit="ether"
          value={data.total}
          symbol={symbol}
          displayShortBalance={3}
        />
      </div>
    </div>
  </div>
);

export default connect<StateProps, DispatchProps, {}, AppState>(
  state => ({
    rates: state.rates.rates,
    balances: state.balances,
  }),
  {
    fetchRates: ratesActions.fetchCCRatesRequested,
  }
)(FinancialsPage);
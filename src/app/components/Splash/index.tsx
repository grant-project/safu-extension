import React from 'react';
import { Button } from 'antd';
import Logo from 'static/images/safu-logo.svg';
import './style.less';

interface Props {
  handleContinue(): void;
  handleRestore(): void;
}

export default class Splash extends React.Component<Props> {
  render() {
    return (
      <div className="Splash">
        <div className="Splash-inner">
          <h2>keep your funds</h2>
          <Logo />
          <ul>
            <li>Tag &amp; keep track of addresses</li>
            <li>Check all of your balances</li>
            <li>Securely store private keys</li>
          </ul>
          <div className="Splash-controls">
            <Button size="large" type="primary" onClick={this.props.handleContinue}>
              Get started
            </Button>
            <a className="Splash-controls-restore" onClick={this.props.handleRestore}>
              Restore Safu backup
            </a>
          </div>
        </div>
      </div>
    );
  }
}

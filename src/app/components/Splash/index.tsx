import React from 'react';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import Logo from 'static/safu-light.svg';
import './style.less';

export default class Splash extends React.Component {
  render() {
    return (
      <div className="Splash">
        <h2>keep your funds</h2>
        <Logo />
        <ul>
          <li>Tag &amp; keep track of addresses</li>
          <li>Check all of your balances</li>
          <li>Securely store private keys</li>
        </ul>
        <div className="Splash-controls">
          <Link to="/">
            <Button size="large" type="primary">
              Get started
            </Button>
          </Link>
          <Link className="Splash-controls-restore" to="/">
            Restore Safu backup
          </Link>
        </div>
      </div>
    );
  }
}

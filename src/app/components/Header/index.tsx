import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { cryptoActions } from 'modules/crypto';
import SafuIcon from 'static/images/safu-icon.svg';
import './style.less';

interface DispatchProps {
  logout: typeof cryptoActions['logout'];
}

type Props = DispatchProps;

class Header extends React.Component<Props> {
  render() {
    return (
      <>
        <div className="Header">
          <SafuIcon className="Header-icon" />
          <div className="Header-links">
            <Link className="Header-links-link" to="/settings">
              <Icon type="setting" />
            </Link>
            <button className="Header-links-link" onClick={this.props.logout}>
              <Icon type="lock" />
            </button>
          </div>
        </div>
        <div className="HeaderPlaceholder" />
      </>
    )
  }
}

export default connect<{}, DispatchProps>(undefined, {
  logout: cryptoActions.logout,
})(Header);
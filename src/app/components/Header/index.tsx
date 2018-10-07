import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { cryptoActions } from 'modules/crypto';
import SafuIcon from 'static/images/safu-icon.svg';
import './style.less';
import safuAudio from 'static/audio/safu-cropped.mp3';

interface DispatchProps {
  logout: typeof cryptoActions['logout'];
}

type Props = DispatchProps;

class Header extends React.Component<Props> {
  handleSafuIcon = () => {
    console.log('safuAudio', safuAudio);
    const myAudio = new Audio(); // create the audio object
    myAudio.src = safuAudio;
    myAudio.play();
  };
  render() {
    return (
      <>
        <div className="Header">
          <SafuIcon className="Header-icon" onClick={this.handleSafuIcon} />
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
    );
  }
}

export default connect<{}, DispatchProps>(
  undefined,
  {
    logout: cryptoActions.logout,
  },
)(Header);

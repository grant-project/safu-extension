import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { cryptoActions } from 'modules/crypto';
import SafuIcon from 'static/images/safu-icon.svg';
import safuAudio from 'static/audio/safu-cropped.mp3';
import OurLordAndSavior from 'static/images/cz.png';
import './style.less';

interface DispatchProps {
  logout: typeof cryptoActions['logout'];
}

type Props = DispatchProps;

interface State {
  areFundsSafu: boolean;
}

class Header extends React.Component<Props, State> {
  state: State = {
    areFundsSafu: false,
  };

  private timeout: any;

  handleSafuIcon = () => {
    const myAudio = new Audio();
    myAudio.src = safuAudio;
    myAudio.play();
    this.setState({ areFundsSafu: false }, () => {
      this.setState({ areFundsSafu: true });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.setState({ areFundsSafu: false });
      }, 20000);
    });
  };

  render() {
    const { areFundsSafu } = this.state;
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
        {areFundsSafu &&
          <div className="OhMyGodItsCZ">
            <div className="OhMyGodItsCZ-cz">
              <img src={OurLordAndSavior} />
            </div>
          </div>
        }
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

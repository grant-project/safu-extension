import React from 'react';
import { Button, Input } from 'antd';
import './style.less';

interface State {
  password1: string;
  password2: string;
  isReady: boolean;
  strength: number;
}

export default class CreatePassword extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      password1: '',
      password2: '',
      isReady: false,
      strength: 0,
    };
  }
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    const setPass = (n: string, nx: string, v: string, d: string) => {
      if (n === nx) {
        return v;
      } else {
        return d;
      }
    };
    const password1 = setPass(name, 'p1', value, this.state.password1);
    const password2 = setPass(name, 'p2', value, this.state.password2);
    const isReady = password1 === password2 && password1.length > 7;
    let strength = 0;
    if (password2.length === 0) {
      strength = 0;
    } else if (password2.length < 4) {
      strength = 1;
    } else if (password2.length < 8) {
      strength = 2;
    } else if (isReady && password2.length >= 8) {
      strength = 3;
    }
    this.setState({ password1, password2, isReady, strength });
  };
  render() {
    return (
      <div className="CreatePassword">
        <h2 className="CreatePassword-title">Create a Password</h2>
        <div className="CreatePassword-label">Password (min 8 chars)</div>
        <Input
          name="p1"
          value={this.state.password1}
          onChange={this.handleInputChange}
          className="CreatePassword-input"
          size="large"
          type="password"
        />
        <div className="CreatePassword-label">Confirm password</div>
        <Input
          name="p2"
          value={this.state.password2}
          onChange={this.handleInputChange}
          className="CreatePassword-input"
          size="large"
          type="password"
        />
        <div className={`CreatePassword-passtr is-str${this.state.strength}`}>
          <div className="CreatePassword-passtr-bar">
            <div className="CreatePassword-passtr-bar-a">&nbsp;</div>
            <div className="CreatePassword-passtr-bar-b">&nbsp;</div>
            <div className="CreatePassword-passtr-bar-c">&nbsp;</div>
          </div>
          <div className="CreatePassword-passtr-text">
            {
              ['', 'Not safu.', 'Almost safu...', 'Password is safu!'][
                this.state.strength
              ]
            }
          </div>
        </div>
        <div className="CreatePassword-continue">
          <Button size="large" type="primary" disabled={!this.state.isReady}>
            Continue
          </Button>
        </div>
        <div className="CreatePassword-disclaimer">
          Safu secures all of your data using AES-256 encryption. This password is the key
          to unlocking when you want to check your accounts. Make sure you back this up,
          it cannot be recovered for you.
        </div>
      </div>
    );
  }
}

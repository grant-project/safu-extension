import React from 'react';
import { Form, Button, Input, Icon } from 'antd';
import zxcvbn from 'zxcvbn';
import './style.less';

interface Props {
  onCreatePassword(password: string): void;
}

interface State {
  password1: string;
  password2: string;
  isReady: boolean;
  strength: number;
}

export default class CreatePassword extends React.Component<Props, State> {
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
    const strength = Math.min(Math.max(zxcvbn(password1).score, value.length ? 1 : 0), 3);
    const isReady = password1 === password2 && strength >= 2;
    this.setState({ password1, password2, isReady, strength });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onCreatePassword(this.state.password1);
  };

  render() {
    const { password1, password2, isReady, strength } = this.state;
    const p2status = password2.length > 0 ?
      password1 === password2 ?
        'success' :
        'error'
      : undefined;
    return (
      <Form className="CreatePassword" onSubmit={this.handleSubmit}>
        <h2 className="CreatePassword-title">Create a Password</h2>

        <Form.Item label="Password">
          <Input
            name="p1"
            value={password1}
            onChange={this.handleInputChange}
            className="CreatePassword-input"
            size="large"
            type="password"
          />
        </Form.Item>
        
        <Form.Item label="Confirm password" validateStatus={p2status}>
          <Input
            name="p2"
            value={password2}
            onChange={this.handleInputChange}
            className="CreatePassword-input"
            size="large"
            type="password"
          />
        </Form.Item>
        <div className={`CreatePassword-passtr is-str${strength}`}>
          <div className="CreatePassword-passtr-bar">
            <div className="CreatePassword-passtr-bar-a" />
            <div className="CreatePassword-passtr-bar-b" />
            <div className="CreatePassword-passtr-bar-c" />
          </div>
          <div className="CreatePassword-passtr-text">
            {
              ['', 'Not safu.', 'Kinda safu...', 'Password is safu!'][
                this.state.strength
              ]
            }
          </div>
        </div>
        <div className="CreatePassword-continue">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            disabled={!this.state.isReady}
          >
            Continue
          </Button>
        </div>
        <div className="CreatePassword-disclaimer">
          Safu secures all of your data using AES-256 encryption. This password is the key
          to unlocking when you want to check your accounts. Make sure you back this up,
          it cannot be recovered for you.
        </div>
      </Form>
    );
  }
}

import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Icon, Input, Form } from 'antd';
import { cryptoActions } from 'modules/crypto';
import { AppState } from 'store/reducers';
import { decryptData, TEST_CIPHER_DATA } from 'utils/crypto';
import './style.less';

interface StateProps {
  testCipher: AppState['crypto']['testCipher'];
  salt: AppState['crypto']['salt'];
  password: AppState['crypto']['password'];
}

interface DispatchProps {
  enterPassword: typeof cryptoActions['enterPassword'];
}

type Props = StateProps & DispatchProps & RouteComponentProps;

interface State {
  password: string;
  error: null | string;
}

class PasswordPage extends React.Component<Props, State> {
  state: State = {
    password: '',
    error: null,
  };

  private input: any;

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { password, error } = this.state;
  
    return (
      <div className="EnterPassword">
        <Form className="EnterPassword-form" onSubmit={this.handleSubmit}>
          <Form.Item validateStatus={error ? 'error' : undefined}>
            <Input.Search
              className="EnterPassword-form-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={this.handleChange}
              enterButton={<Icon type="unlock" />}
              ref={el => this.input = el}
            />
          </Form.Item>
        </Form>
      </div>
    );
  }

  private handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: ev.currentTarget.value,
      error: null,
    });
  };

  private handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { password } = this.state;
    const { testCipher, salt } = this.props;
    try {
      const data = decryptData(testCipher, password, salt as string);
      if (data !== TEST_CIPHER_DATA) {
        throw new Error('Incorrect password');
      }
      this.props.enterPassword(password);
    } catch(err) {
      this.setState({ error: 'Password was incorrect' });
    }
  };
}

const ConnectedPasswordPage = connect<StateProps, DispatchProps, {}, AppState>(
  state => ({
    testCipher: state.crypto.testCipher,
    salt: state.crypto.salt,
    password: state.crypto.password,
  }),
  {
    enterPassword: cryptoActions.enterPassword,
  },
)(PasswordPage);

export default withRouter(ConnectedPasswordPage);
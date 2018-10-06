import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { cryptoActions } from 'modules/crypto';
import { AppState } from 'store/reducers';
import { decryptData, TEST_CIPHER_DATA } from 'utils/crypto';

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

  componentDidUpdate(prevProps: Props) {
    if (prevProps.password !== this.props.password) {
      this.props.history.replace('/');
    }
  }

  render() {
    const { password } = this.state;
  
    return (
      <>
        <h1>Enter password</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
      </>
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
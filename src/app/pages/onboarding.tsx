import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { cryptoActions } from 'modules/crypto';
import { AppState } from 'store/reducers';

interface StateProps {
  password: AppState['crypto']['password'];
}

interface DispatchProps {
  generateSalt: typeof cryptoActions['generateSalt'];
  setPassword: typeof cryptoActions['setPassword'];
}

type Props = StateProps & DispatchProps & RouteComponentProps;

interface State {
  password: string;
  passwordConfirm: string;
}

class OnboardingPage extends React.Component<Props, State> {
  state: State = {
    password: '',
    passwordConfirm: '',
  };

  componentDidMount() {
    this.props.generateSalt();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.password !== this.props.password) {
      this.props.history.replace('/');
    }
  }

  render() {
    const { password, passwordConfirm } = this.state;
    return (
      <>
        <h1>Onboarding</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Password
            <input
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Confirm password
            <input
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={this.handleChange}
            />
          </label>
          <button>Continue</button>
        </form>
      </>
    );
  }

  private handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;
    this.setState({ [name]: value } as any);
  }

  private handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { password, passwordConfirm } = this.state;
    if (password && password === passwordConfirm) {
      this.props.setPassword(password);
    }
  };
}

const ConnectedOnboardingPage = connect<StateProps, DispatchProps, {}, AppState>(
  state => ({
    password: state.crypto.password,
  }),
  {
    generateSalt: cryptoActions.generateSalt,
    setPassword: cryptoActions.setPassword,
  },
)(OnboardingPage);

export default withRouter(ConnectedOnboardingPage);
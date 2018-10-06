import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import CreatePassword from 'components/CreatePassword';
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

class OnboardingPage extends React.Component<Props> {
  componentDidMount() {
    this.props.generateSalt();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.password !== this.props.password) {
      this.props.history.replace('/');
    }
  }

  render() {
    return <CreatePassword onCreatePassword={this.props.setPassword} />;
  }
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
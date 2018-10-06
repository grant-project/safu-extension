import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { cryptoActions } from 'modules/crypto';

interface DispatchProps {
  generateSalt: typeof cryptoActions['generateSalt'];
  setPassword: typeof cryptoActions['setPassword'];
}

type Props = DispatchProps;

class OnboardingPage extends React.Component<Props> {
  componentDidMount() {
    this.props.generateSalt();
  }

  render() {
    return (
      <>
        <h1>Onboarding</h1>
        <Link to="/">Continue</Link>
      </>
    );
  }
}

export default connect(undefined, {
  generateSalt: cryptoActions.generateSalt,
  setPassword: cryptoActions.setPassword,
})(OnboardingPage);
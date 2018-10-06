import React from 'react';
import { Link } from 'react-router-dom';

export default class OnboardingPage extends React.Component {
  render() {
    return (
      <>
        <h1>Onboarding</h1>
        <Link to="/addresses">Continue</Link>
      </>
    );
  }
}
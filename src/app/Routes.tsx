import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router';
import { AppState } from 'store/reducers';
import OnboardingPage from 'pages/onboarding';
import AddressesPage from 'pages/addresses';
import SettingsPage from 'pages/settings';

interface StateProps {
  hasSetPassword: AppState['crypto']['hasSetPassword'];
}

type Props = StateProps & RouteComponentProps;

class Routes extends React.Component<Props> {
  componentDidMount() {
    const { hasSetPassword, history } = this.props;
    if (!hasSetPassword) {
      history.replace('/onboarding');
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact component={AddressesPage} />
        <Route path="/onboarding" exact component={OnboardingPage} />
        <Route path="/settings" exact component={SettingsPage} />
        <Route path="/*" render={() => <h1>Oh shit howd you get here</h1>} />
      </Switch>
    );
  }
}

const ConnectedRoutes = connect<StateProps, {}, {}, AppState>(
  state => ({
    hasSetPassword: state.crypto.hasSetPassword,
  })
)(Routes);

export default withRouter(ConnectedRoutes);
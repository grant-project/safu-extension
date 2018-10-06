import React from 'react';
import { Switch, Route } from 'react-router';
import OnboardingPage from 'pages/onboarding';
import AddressesPage from 'pages/addresses';
import SettingsPage from 'pages/settings';

export default () => (
  <Switch>
    <Route path="/" exact component={AddressesPage} />
    <Route path="/onboarding" exact component={OnboardingPage} />
    <Route path="/settings" exact component={SettingsPage} />
    <Route path="/*" render={() => <h1>Oh shit howd you get here</h1>} />
  </Switch>
);
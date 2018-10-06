import React from 'react';
import { Switch, Route } from 'react-router';

export default () => (
  <Switch>
    <Route path="/*" render={() => <h1>Hello</h1>} />
  </Switch>
);
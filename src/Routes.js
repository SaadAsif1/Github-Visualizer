import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserInfo from './components/user-info/User';
import Charts from './components/charts/Charts';

export default function Routes() {
  return (
    <Switch>
      <Route
        exact
        to='/user?id=username'
        component={() => (
          <div>
            <UserInfo />
            <Charts />
          </div>
        )}
      />
    </Switch>
  );
}

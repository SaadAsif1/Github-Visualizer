import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserInfo from './components/user-info/User';

export default function Routes() {
  return (
    <Switch>
      <Route path='/' component={() => <UserInfo />} />
    </Switch>
  );
}

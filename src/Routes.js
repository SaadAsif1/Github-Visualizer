import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserInfo from './components/user-info/User';
import Charts from './components/charts/Charts';
import Repos from './components/top-repos/Repos';
import Home from './components/home/Home';
import GithubIcon from './components/GithubIcon';

export default function Routes() {
  return (
    <Switch>
      <Route
        path='/user'
        component={() => (
          <div>
            <GithubIcon />
            <UserInfo />
            <Charts />
            <Repos />
          </div>
        )}
      />
      <Route exact path='/' component={Home} />
    </Switch>
  );
}

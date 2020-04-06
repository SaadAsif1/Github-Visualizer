import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserInfo from './components/user-info/User';
import Charts from './components/charts/Charts';
import Repos from './components/top-repos/Repos';
import Home from './components/home/Home';
import GithubIcon from './components/GithubIcon';
import NotFound from './components/404/Index';
import Footer from './components/footer/Footer';

export default function App() {
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
            <Footer />
          </div>
        )}
      />
      <Route exact path='/' component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

import React, { useState } from 'react';
import Routes from './Routes';
import axios from 'axios';

const App = () => {
  useState(() => {
    var config = {
      Headers: { Authorization: process.env.REACT_APP_GITHUB_ACCESS_TOKEN }
    };
    axios
      .get(
        `https://api.github.com/rate_limit?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;

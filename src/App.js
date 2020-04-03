import React from 'react';
import UserInfo from './components/user-info/User';

// https://api.github.com/users/?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}/bradtraversy/repos?per_page=100&page=3

export default function App() {
  return (
    <div>
      <div>
        <UserInfo />
      </div>
    </div>
  );
}

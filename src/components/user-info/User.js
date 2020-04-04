import React from 'react';
import UserInfo from './UserInfo';
import Input from './user-components/Input';
import './User.css';
import { Redirect, withRouter } from 'react-router-dom';

const User = ({ history }) => {
  return (
    <div>
      {history.location.pathname === '/' && <Redirect to='/user?id=saadasif1' />}
      <Input />
      <UserInfo />
    </div>
  );
};

export default withRouter(User);

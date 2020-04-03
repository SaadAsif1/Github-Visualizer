import React from 'react';
import UserInfo from './UserInfo';
import Input from './user-components/Input';
import './User.css';
import { Redirect } from 'react-router-dom';

export default function User({ location, history }) {
  return (
    <div>
      {location.pathname === '/' && <Redirect to='/user?id=saadasif1' />}
      <Input />
      <UserInfo />
    </div>
  );
}

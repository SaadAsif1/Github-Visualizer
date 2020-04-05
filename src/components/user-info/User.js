import React from 'react';
import UserInfo from './UserInfo';
import Input from './user-components/Input';
import './User.css';

const User = () => {
  return (
    <div>
      <Input />
      <UserInfo />
    </div>
  );
};

export default User;

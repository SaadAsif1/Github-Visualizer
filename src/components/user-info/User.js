import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import UserInfo from './UserInfo';
import Input from './user-components/Input';
import './user.css';

const User = ({ history }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    // gets the id from url
    const username = queryString.parse(history.location.search);
    setTitle(username.id);
  }, [history.location.search]);

  return (
    <div>
      <Input />
      <UserInfo />
      <Helmet>
        <title>Github | {title}</title>
      </Helmet>
    </div>
  );
};

export default withRouter(User);

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfo from './UserInfo';
import UserLoading from './UserLoading';
import './user.css';

export default function User() {
  const [values, setValues] = useState({
    userData: ''
  });

  // Destructuring value
  const { userData } = values;

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/users/saadasif1?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then(result => {
        setValues({ ...values, userData: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return <div>{userData ? <UserInfo data={userData} /> : <UserLoading />}</div>;
}

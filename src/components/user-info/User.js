import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function User() {
  const [values, setValues] = useState({
    userData: ''
  });

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

  return <div></div>;
}

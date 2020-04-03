import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import { withRouter } from 'react-router-dom';

const Input = ({ history }) => {
  const [values, setValues] = useState({
    githubName: ''
  });

  const { githubName } = values;

  useEffect(() => {
    const value = queryString.parse(history.location.search);
    setValues({ ...values, githubName: value.id });
  }, []);

  // Handle Input change
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value, buttonDisable: false });
  };

  // On Enter
  const onEnter = event => {
    if (event.key === 'Enter') {
      history.push({
        pathname: '/user',
        search: `?id=${githubName}`
      });
    }
  };

  return (
    <div className='back'>
      <input
        type='text'
        className='github-input'
        placeholder='Github Username'
        onChange={handleChange('githubName')}
        onKeyDown={onEnter}
        value={githubName}
      />
    </div>
  );
};

export default withRouter(Input);

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { IoLogoGithub } from 'react-icons/io';
import './Home.css';

const Home = ({ history }) => {
  const [values, setValues] = useState({
    githubName: ''
  });

  const { githubName } = values;

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
    <div className='home-background'>
      <div className='home-container'>
        <IoLogoGithub className='github-home' />
        <div className='home-header'>Find Github Profile</div>
        <input
          type='text'
          spellCheck='false'
          className='home-input'
          onChange={handleChange('githubName')}
          onKeyDown={onEnter}
          value={githubName}
        />
      </div>
    </div>
  );
};

export default withRouter(Home);

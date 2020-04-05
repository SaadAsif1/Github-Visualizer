import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import InfoBox from './user-components/InfoBox';
import Description from './user-components/Description';
import UserLoading from './UserLoading';
import UserNotFound from './UserNotFound';

const UserInfo = ({ history }) => {
  const [values, setValues] = useState({
    userData: '',
    notFound: false
  });

  // Destructuring value
  const { userData, notFound } = values;

  useEffect(() => {
    // this shows loading effect
    setValues({ ...values, userData: '', notFound: false });

    // gets the id from url
    const username = queryString.parse(history.location.search);
    axios
      .get(
        `https://api.github.com/users/${username.id}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      .then(result => {
        setValues({ ...values, userData: result.data, notFound: false });
      })
      .catch(error => {
        setValues({ ...values, userData: '', notFound: true });
      });
  }, [history.location.search]);

  return (
    <div className='background'>
      {notFound && <UserNotFound />}
      {userData ? (
        <div className='container app-containter'>
          <img src={userData.avatar_url} alt='avatar' className='avatar' />
          <div className='name'>{userData.name}</div>
          <a
            href={userData.html_url}
            target='_blank'
            rel='noopener noreferrer'
            className='username'
          >
            @{userData.login}
          </a>
          <Description
            location={userData.location}
            company={userData.company}
            joinedAt={userData.created_at}
          />
          <div className='info-display'>
            <InfoBox name='REPOSITORIES' number={userData.public_repos} />
            <InfoBox name='FOLLOWERS' number={userData.followers} />
            <InfoBox name='FOLLOWING' number={userData.following} />
          </div>
        </div>
      ) : (
        !notFound && <UserLoading />
      )}
    </div>
  );
};

export default withRouter(UserInfo);

import React from 'react';
import InfoBox from './InfoBox';
import Description from './Description';

export default function UserInfo({
  data: {
    avatar_url,
    html_url,
    login,
    name,
    public_repos,
    followers,
    following,
    location,
    company,
    created_at
  }
}) {
  return (
    <div className='background'>
      <div className='container'>
        <img src={avatar_url} alt='avatar' className='avatar' />
        <div className='name'>{name}</div>
        <a href={html_url} target='_blank' rel='noopener noreferrer' className='username'>
          @{login}
        </a>
        <Description location={location} company={company} joinedAt={created_at} />
        <div className='info-display'>
          <InfoBox name='REPOSITORIES' number={public_repos} />
          <InfoBox name='FOLLOWERS' number={followers} />
          <InfoBox name='FOLLOWING' number={following} />
        </div>
      </div>
    </div>
  );
}

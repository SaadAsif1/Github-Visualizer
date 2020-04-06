import React from 'react';
import { FaGithubAlt } from 'react-icons/fa';

export default function ErrorRepos() {
  return (
    <div className='repo-error-container'>
      <FaGithubAlt className='repo-error-icons' />
      <div className='repo-error'>No Repos</div>
    </div>
  );
}

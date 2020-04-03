import React from 'react';
import { FaGithubAlt } from 'react-icons/fa';

export default function UserNotFound() {
  return (
    <div className='notfound-container'>
      <FaGithubAlt className='notfound-icon' />
      <div className='notfound-text'>User not found</div>
    </div>
  );
}

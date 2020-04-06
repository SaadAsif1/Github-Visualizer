import React from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import './404.css';

export default function Index() {
  return (
    <div id='main'>
      <div className='fof'>
        <h1>Error 404</h1>
        <div className='not-found-container'>
          <Link to='/' className='home-button'>
            <FaLongArrowAltLeft className='not-found-arrow' /> <div>Home Page</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

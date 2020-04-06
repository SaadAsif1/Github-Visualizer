import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className='footer'>
      Built with{' '}
      <a
        target='_blank'
        href='https://reactjs.org/'
        rel='noopener noreferrer'
        className='footer-ref'
      >
        React.js
      </a>{' '}
      ·{' '}
      <a
        target='_blank'
        href='https://www.chartjs.org/'
        rel='noopener noreferrer'
        className='footer-ref'
      >
        Chart.js
      </a>{' '}
      ·{' '}
      <a
        target='_blank'
        href='https://joshwcomeau.github.io/react-flip-move/'
        rel='noopener noreferrer'
        className='footer-ref'
      >
        React Flip Move
      </a>{' '}
      ·{' '}
      <a
        target='_blank'
        href='https://github.com/IonicaBizau/node-gh-polyglot'
        rel='noopener noreferrer'
        className='footer-ref'
      >
        GitHub Polyglot
      </a>{' '}
      ·{' '}
      <a
        target='_blank'
        href='https://reacttraining.com/react-router/'
        rel='noopener noreferrer'
        className='footer-ref'
      >
        React-Router-Dom
      </a>{' '}
      and more!
    </div>
  );
}

import React from 'react';

export default function InfoBox({ name, number }) {
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  return (
    <div className='info-box'>
      <div className='info-number'>{formatNumber(number)}</div>
      <div className='info-name'>{name}</div>
    </div>
  );
}

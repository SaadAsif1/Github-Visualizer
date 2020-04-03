import React from 'react';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';

export default function Description({ location, company, joinedAt }) {
  return (
    <div className='description-container'>
      {company && (
        <div className='description'>
          <FaBriefcase /> <div className='description-text'>{company}</div>
        </div>
      )}
      {location && (
        <div className='description'>
          <FiMapPin /> <div className='description-text'>{location}</div>
        </div>
      )}
      {joinedAt && (
        <div className='description'>
          <FaCalendarAlt />
          <div className='description-text'>
            Joined{' '}
            {new Date(joinedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>
      )}
    </div>
  );
}

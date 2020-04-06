import React from 'react';
import TopLangChart from './TopLangChart';
import StartsRepoChart from './StarsRepoChart';
import ForkedChart from './ForkedChart';
import './Chart.css';

const Charts = () => {
  return (
    <div className='chart-container app-container'>
      <div className='chart-card'>
        <TopLangChart />
      </div>
      <div className='chart-card'>
        <StartsRepoChart />
      </div>
      <div className='chart-card'>
        <ForkedChart />
      </div>
    </div>
  );
};
export default Charts;

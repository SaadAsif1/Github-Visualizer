import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import GhPolyglot from 'gh-polyglot';
import queryString from 'query-string';
import { Pie } from 'react-chartjs-2';
import { FaGithubAlt } from 'react-icons/fa';
import Loader from './ChartLoader';

const TopLangChart = ({ history }) => {
  const [values, setValues] = useState({
    chartData: '',
    error: false,
    loading: false
  });

  const { chartData, error, loading } = values;

  useEffect(() => {
    const username = queryString.parse(history.location.search);

    // Check for incorrect url
    if (!username.id) {
      return setValues({ ...values, error: true });
    }

    const me = new GhPolyglot(username.id, process.env.REACT_APP_GITHUB_ACCESS_TOKEN);

    // Show Loading
    setValues({ ...values, loading: true });

    me.userStats((err, stats) => {
      if (err) {
        return setValues({ ...values, error: true, loading: false });
      }

      if (stats.length === 0) {
        return setValues({ ...values, error: true, loading: false });
      }

      let data = [];
      let labels = [];
      let backgroundColor = [];

      stats.map(cur => {
        data.push(cur.value);
        labels.push(cur.label);
        backgroundColor.push(cur.color);
      });

      setValues({
        ...values,
        error: false,
        loading: false,
        chartData: { labels, datasets: [{ backgroundColor, data }] }
      });
    });
  }, [history.location.search]);

  return (
    <div>
      <h1 className='chart-title'>Top Languages</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className='error-container'>
          <FaGithubAlt className='error-icon' />
          <div className='error-text'>No Languages</div>
        </div>
      ) : (
        chartData && (
          <div className='chart-graphBox'>
            <Pie
              data={chartData}
              options={{
                title: {
                  display: true,
                  fontSize: 10
                },
                elements: {
                  arc: {
                    borderWidth: 0 // <-- Set this to zero
                  }
                },
                legend: {
                  display: true,
                  position: 'right',
                  labels: {
                    boxWidth: 28,
                    padding: 15
                  }
                },
                responsive: true
              }}
              height={150}
              width={200}
            />
          </div>
        )
      )}
    </div>
  );
};
export default withRouter(TopLangChart);

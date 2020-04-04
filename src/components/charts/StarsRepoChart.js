import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import { Bar } from 'react-chartjs-2';
import { FaGithubAlt } from 'react-icons/fa';

const StarsRepoChart = ({ history }) => {
  const [values, setValues] = useState({
    barData: '',
    error: false
  });

  // Destructuring
  const { barData, error } = values;

  // sort array descenting order
  function numberDes(a, b) {
    return b.repo_stars - a.repo_stars;
  }

  useEffect(() => {
    const username = queryString.parse(history.location.search);

    var config = {
      headers: { Authorization: process.env.REACT_APP_GITHUB_ACCESS_TOKEN }
    };

    axios
      .get(
        `https://api.github.com/users/${username.id}/repos?page=1&per_page=100`,
        config
      )
      .then(result => {
        let data = [];

        // check for errors
        if (!result.data[0]) {
          return setValues({ ...values, error: true });
        }

        result.data.map(cur => {
          data.push({ repo_stars: cur.stargazers_count, repo_name: cur.name });
        });

        let labels = [];
        let barOrderData = [];

        data
          .sort(numberDes)
          .slice(0, 5)
          .map(cur => {
            labels.push(cur.repo_name);
            barOrderData.push(cur.repo_stars);
          });

        setValues({
          ...values,
          error: false,
          barData: {
            labels,
            datasets: [
              {
                backgroundColor: [
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(255, 206, 86, 0.7)',
                  'rgba(75, 192, 192, 0.7)',
                  'rgba(153, 102, 255, 0.7)',
                  'rgba(255, 159, 64, 0.7)'
                ],
                data: barOrderData
              }
            ]
          }
        });
      })
      .catch(error => {
        setValues({ ...values, error: true });
      });
  }, [history.location.search]);

  return (
    <div>
      <h1 className='chart-title'>Most Starred</h1>
      {error ? (
        <div className='error-container'>
          <FaGithubAlt className='error-icon' />
          <div className='error-text'>No Starred Repos</div>
        </div>
      ) : (
        barData && (
          <Bar
            height={60}
            width={60}
            data={barData}
            options={{
              title: {
                display: true,
                fontSize: 20
              },
              legend: {
                display: false
              }
            }}
          />
        )
      )}
    </div>
  );
};

export default withRouter(StarsRepoChart);

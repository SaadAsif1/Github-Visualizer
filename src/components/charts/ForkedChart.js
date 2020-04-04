import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { FaGithubAlt } from 'react-icons/fa';

const ForkedChart = ({ history }) => {
  const [values, setValues] = useState({
    doughnutData: '',
    noForks: false
  });

  // Destructuring
  const { doughnutData, noForks } = values;

  // sort array descenting order
  function numberDes(a, b) {
    return b.forks_count - a.forks_count;
  }

  // check if forks are all 0's
  const allEqual = arr => arr.every(v => v === arr[0]);

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
        let forks = [];

        result.data.map(cur => {
          data.push({ forks_count: cur.forks_count, repo_name: cur.name });
          forks.push(cur.forks_count);
        });

        // all forks are 0
        if (allEqual(forks)) {
          return setValues({ ...values, noForks: true });
        }

        let labels = [];
        let doughnutOrderData = [];

        data
          .sort(numberDes)
          .slice(0, 5)
          .map(cur => {
            labels.push(cur.repo_name);
            doughnutOrderData.push(cur.forks_count);
          });

        setValues({
          ...values,
          noForks: false,
          doughnutData: {
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
                data: doughnutOrderData
              }
            ]
          }
        });
      })
      .catch(error => {
        setValues({ ...values, noForks: true });
      });
  }, [history.location.search]);

  return (
    <div>
      <h1 className='chart-title'>Top Forked</h1>

      {noForks ? (
        <div className='error-container'>
          <FaGithubAlt className='error-icon' />
          <div className='error-text'>No Forks</div>
        </div>
      ) : (
        doughnutData && (
          <Doughnut
            data={doughnutData}
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
        )
      )}
    </div>
  );
};
export default withRouter(ForkedChart);

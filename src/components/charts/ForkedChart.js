import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Doughnut } from 'react-chartjs-2';
import { FaGithubAlt } from 'react-icons/fa';
import Loader from './ChartLoader';

const ForkedChart = ({ history }) => {
  const [values, setValues] = useState({
    doughnutData: '',
    noForks: false,
    loading: false
  });

  // Destructuring
  const { doughnutData, noForks, loading } = values;

  // sort array descenting order
  function numberDes(a, b) {
    return b.forks_count - a.forks_count;
  }

  // check if forks are all 0's
  const allEqual = arr => arr.every(v => v === arr[0]);

  useEffect(() => {
    // Query string
    const username = queryString.parse(history.location.search);

    // Headers
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // Show Loader
    setValues({ ...values, loading: true });

    fetch(
      `https://api.github.com/users/${username.id}/repos?page=1&per_page=100`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        let data = [];
        let forks = [];

        result.map(cur => {
          data.push({ forks_count: cur.forks_count, repo_name: cur.name });
          forks.push(cur.forks_count);
        });

        // all forks are 0
        if (allEqual(forks)) {
          return setValues({ ...values, noForks: true, loading: false });
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
          loading: false,
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
      {loading ? (
        <Loader />
      ) : noForks ? (
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

import axios from 'axios';

export const setAllRepos = username => {
  let apiCalls = [];
  var config = {
    headers: { Authorization: process.env.REACT_APP_GITHUB_ACCESS_TOKEN }
  };
  axios
    .get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    .then(response => {
      if (response.data.public_repos <= 100) {
        apiCalls.push(axios.get(`${response.data.repos_url}?per_page=100`, config));
      }

      if (response.data.public_repos > 100 && response.data.public_repos <= 200) {
        for (let i = 1; i <= 2; i++) {
          apiCalls.push(
            axios.get(`${response.data.repos_url}?page=${i}&per_page=100`, config)
          );
        }
      }

      if (response.data.public_repos > 200) {
        for (let i = 1; i <= 3; i++) {
          apiCalls.push(
            axios.get(`${response.data.repos_url}?page=${i}&per_page=100`, config)
          );
        }
      }

      axios
        .all(apiCalls)
        .then(
          axios.spread((...responses) => {
            let data = [];
            responses.map(cur => {
              data.push(cur.data);
            });
            var merged = [].concat.apply([], data);

            localStorage.setItem(username, JSON.stringify(merged));
          })
        )

        .catch(errors => {
          // react on errors.
          localStorage.setItem('error', JSON.stringify(errors));
        });
    })
    .catch(error => {
      localStorage.setItem('error', JSON.stringify(error));
    });
};

export const getAllRepos = username => {
  const userRepo = JSON.parse(localStorage.getItem(username));
  return userRepo;
};

export const removeAllRepos = username => {
  localStorage.removeItem(username);
};

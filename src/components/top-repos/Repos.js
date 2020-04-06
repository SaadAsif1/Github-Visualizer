import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Select from 'react-select';
import FlipMove from 'react-flip-move';
import Octicon, { Repo, Star, RepoForked } from '@primer/octicons-react';
import { langColors } from '../../utils/langcolors';
import './Repo.css';

const Repos = ({ history }) => {
  const [values, setValues] = useState({
    selectedOption: null,
    allRepos: '',
    topRepos: ''
  });

  const { allRepos, topRepos } = values;

  // When compoenets mounts
  useEffect(() => {
    // gets the id from url
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

    fetch(
      `https://api.github.com/users/${username.id}/repos?page=1&per_page=100`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        setValues({ ...values, allRepos: result });
      })
      .catch(err => {
        console.log(err);
      });
  }, [history.location.search]);

  // when result is given to total Repos

  const getTopRepos = type => {
    if (allRepos !== '') {
      const LIMIT = 8;
      const map = {
        stars: 'stargazers_count',
        forks: 'forks_count',
        size: 'size'
      };
      const sortProperty = map[type];
      const sorted = allRepos
        .filter(repo => !repo.fork)
        .sort((a, b) => b[sortProperty] - a[sortProperty])
        .slice(0, LIMIT);
      setValues({ ...values, topRepos: sorted });
    }
  };

  // handle select change
  const handleChange = selectedOption => {
    setValues({ ...values, selectedOption });
    getTopRepos(selectedOption.value);
  };

  // Select Options   // Select Options  // Select Options  // Select Options
  const options = [
    { value: 'forks', label: 'forks' },
    { value: 'stars', label: 'stars' },
    { value: 'size', label: 'size' }
  ];

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center'
  };

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
  // Select Options  // Select Options  // Select Options  // Select Options

  return (
    <div className='repo-card-container '>
      <div className='repo-container'>
        <h1>Top Repos</h1>
        <div className='repo-main-sub'>by</div>
        <div className='dropdown-container'>
          <Select
            onChange={handleChange}
            defaultValue={options[1]}
            options={options}
            formatGroupLabel={formatGroupLabel}
          />
        </div>
      </div>
      <div className='repo-list'>
        {topRepos && (
          <FlipMove typeName='ul'>
            {topRepos.map(repo => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='repo'
                >
                  <div className='repo__top'>
                    <div className='repo__name'>
                      <Octicon icon={Repo} />
                      <h3 className='repo-header'>{repo.name}</h3>
                    </div>
                    <p className='repo-subheading'>{repo.description}</p>
                  </div>
                  <div className='repo-stats'>
                    <div className='repo-stats-left'>
                      <div
                        className='language'
                        style={{
                          backgroundColor: !langColors[repo.language]
                            ? 'blue'
                            : langColors[repo.language]
                        }}
                      />
                      {repo.language}
                      <span className='repo-icon'>
                        <Octicon icon={Star} className='github-icon' />
                        {repo.stargazers_count.toLocaleString()}
                      </span>
                      <span>
                        <Octicon icon={RepoForked} className='github-icon' />
                        {repo.forks.toLocaleString()}
                      </span>
                    </div>
                    <div className='repo__stats--right repo-icon'>
                      <span>{repo.size.toLocaleString()} KB</span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </FlipMove>
        )}
      </div>
    </div>
  );
};
export default withRouter(Repos);

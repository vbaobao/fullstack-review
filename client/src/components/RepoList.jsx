import React from 'react';

const RepoList = (props) => {
  console.log(props);
  let count = 0;
  let repos = props.repos.map((repo) => {
    return (
      <tr>
      <td>{++count}</td>
        <td><a href={repo.user_url}>{repo.user_name}</a></td>
        <td><a href={repo.repo_url}>{repo.repo_name}</a></td>
        <td><a href={repo.repo_forks.url}>{repo.repo_forks.count}</a></td>
        <td><a href={repo.repo_stars.url}>{repo.repo_stars.count}</a></td>
        <td>{repo.repo_watchers_count}</td>
      </tr>
    );
  });

  return (
    <div>
    <h4> Repo List Component </h4>
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Repository</th>
          <th>Forks</th>
          <th>Stars</th>
          <th>Watchers</th>
        </tr>
      </thead>
      <tbody>
        {repos}
      </tbody>
    </table>
  </div>
  );
};

export default RepoList;
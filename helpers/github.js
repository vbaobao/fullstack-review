const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.GITHUBAPI_TOKEN || config.TOKEN}`
    }
  };

  axios(options)
  .then(res => callback(null,res.data))
  .catch(err => callback(err));
}

module.exports.getReposByUsername = getReposByUsername;
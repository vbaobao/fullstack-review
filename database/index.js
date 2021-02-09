const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  user_name: String,
  user_id: Number
  user_url: String,
  repo_name: String,
  repo_id: {type: Number, unique: true},
  repo_url: String,
  repo_forks: {url: String, count: Number},
  repo_stars: {url: String, count: Number},
  repo_watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  for (const repo of data) {
    let entry = new Repo({
      user_name: repo.owner.login,
      user_id: repo.owner.id,
      user_url: repo.owner.url,
      repo_name: repo.name,
      repo_id: repo.id,
      repo_url: repo.html_url,
      repo_forks: {url: repo.forks_url, count: repo.forks_count },
      repo_stars: {url: repo.stargazers_url, count: repo.stargazers_count },
      repo_watchers_count: repo.watchers_count
    });

    entry.save((err, row) => {
      if (err) return console.error('Cannot save to Mongo: ' err);
      console.log('Saved row to Mongo successfully: ', row)
    })
  }
}

module.exports.save = save;
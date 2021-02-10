const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher',  {useMongoClient: true});

let repoSchema = mongoose.Schema({
  user_name: String,
  user_id: Number,
  user_url: String,
  repo_name: String,
  repo_id: {type: Number, unique: true},
  repo_url: String,
  repo_forks: {url: String, count: Number},
  repo_stars: {url: String, count: Number},
  repo_watchers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  let newRows = [];
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

    newRows.push(entry);
  }

  Repo.insertMany(newRows)
    .then(() => callback(null))
    .catch((err) => callback(err));
}

let top25 = (callback) => {
  Repo.find().
  sort('-repo_forks.count').
  limit(25).
  select('user_name user_id user_url repo_name repo_id repo_url repo_forks.url repo_forks.count repo_stars.url repo_stars.count repo_watchers_count').
  exec(callback);
};

module.exports.save = save;
module.exports.top25 = top25;
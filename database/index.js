const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  user_name: String,
  user_url: String,
  repo_name: String,
  repo_url: String,
  repo_forks: {url: String, count: Number},
  repo_stars: {url: String, count: Number},
  repo_watchers: {url: String, count: Number}
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
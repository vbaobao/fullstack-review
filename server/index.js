const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  github.getReposByUsername(req.body.user_name, (err, results) => {
    if (err) console.error('POST /repos error: ', err);
    db.save(results);
    res.send('Saved repos to database.');
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


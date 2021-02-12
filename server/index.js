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
    if (err) {
      console.error('POST /repos error');
      res.send('No such user found.');
      return;
    }
    db.save(results, (err) => {
      if (err) console.error(err.errmsg);
      db.top25((err, results) => {
        if (err) console.error(err.errmsg);
        res.send(results);
      });
    });
  })
});

app.get('/repos', function (req, res) {
  db.top25((err, results) => {
    if (err) console.err(err.errmsg);
    res.send(results);
  });

});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


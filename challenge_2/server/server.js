const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const helpers = require('./helpers.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(express.static('client'));


app.post('/', (req, res) => {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    var json = body.slice(body.indexOf('{'), body.lastIndexOf('}') + 1);
    helpers.getCSVfromJSON(json, (err, results) => {
      if (err) {
        res.sendStatus(400);
      } else {
        helpers.currentCSV = results;
        res.status(201).send(results);
      }
    });
  });
})

app.get('/csv', (req, res) => {
  res.status(200);
  res.set('Content-Type', 'text/csv');
  res.send(helpers.currentCSV);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

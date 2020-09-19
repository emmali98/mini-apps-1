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
        res.status(201).send(results);

        // fs.readFile(__dirname + '/client/index.html', 'utf8', (err, data) => {
        //   if (err) throw err;
        //   else {
        //     var insertIdx = data.indexOf('crv') + 5;
        //     var page = data.slice(0, insertIdx) + results + data.slice(insertIdx);
        //     res.status(201).send(page);
        //   }
        // })
      }
    });
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.
// You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.
// You may also assume that child records in the JSON will always be in a property called `children`.

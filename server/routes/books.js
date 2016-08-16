var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/Omicron';

router.get('/', function (req, res) {
  // Retrieve books from database
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM books', function (err, result) {
      done(); // closes connection, I only have 10!

      if (err) {
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var book = req.body;
  console.log(req.body);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log(req.body);
      res.sendStatus(500);
    }

    client.query('INSERT INTO books (author, title, published, edition, publisher) ' + 'VALUES ($1, $2, $3, $4, $5)',
                [book.author, book.title, book.published, book.edition, book.publisher],
                function (err, result) {
                  done();

                  if (err) {
                    res.sendStatus(500);
                  } else {

                  res.sendStatus(201);
                }
              });
  });
});

module.exports = router;

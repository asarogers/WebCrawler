const dbConnection = require("./DatabaseConnection.js");

function readFromTable(req, res) {
  dbConnection.query(
    `SELECT * FROM scrappedData`,
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
}

function getTableNames(req, res) {
  dbConnection.query(
    `SELECT * FROM tablenames`,
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
}

function postIntoTable(req, res) {
  const { columnName, results, university, database } = req.body;
  var msg;

  switch (database) {
    case "scrappedata":
      results.forEach((url) => {
        dbConnection.query(
          `INSERT INTO ${database} (url, columnName, University) VALUES ('${url}', '${columnName}', '${university}')`,
          function (err, result, fields) {
            if (err) throw err;
            msg = result;
          }
        );
      });
      console.log("posted to the scrappedata");
      break;
    case "tablenames":
      msg = "tablenames";
      console.log("posted to tablenames");
      break;
    case "rental":
      results.forEach((url) => {
        dbConnection.query(
          `INSERT INTO ${database} (url) VALUES ('${url}')`,
          function (err, result, fields) {
            if (err) throw err;
            msg = result;
          }
        );
      });
      msg = "rental";
      console.log("posted to rental");
      break;
    default:
      results.forEach((url) => {
        dbConnection.query(
          `INSERT INTO scrappedData (url, columnName, University) VALUES ('${url}', '${columnName}', '${university}')`,
          function (err, result, fields) {
            if (err) throw err;
            msg = result;
          }
        );
      });
      break;
  }
  res.send(msg);
}

function insertIntoTable(req, res) {
  const { results, dictionary, targetColumn } = req.body;
  var msg;
  console.log(dictionary);
  results.forEach((elem) => {
    // use the url as a key for dictioanry to insert data into the target column
    dbConnection.query(
      `UPDATE scrappedData SET ${targetColumn} = '${
        dictionary[elem.url]
      }' where url = '${elem.url}'`,
      function (err, result, fields) {
        if (err) throw err;
        msg = result;
      }
    );
  });

  console.log("done with insertion");
  res.send(msg);
}

module.exports = {
  insertIntoTable: insertIntoTable,
  readFromTable: readFromTable,
  postIntoTable: postIntoTable,
  getTableNames: getTableNames,
};

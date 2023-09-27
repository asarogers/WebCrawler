const dbConnection = require("./DatabaseConnection.js")

function readFromTable(req, res){
    dbConnection.query(`SELECT * FROM scrappedData`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
}

function postIntoTable(req, res){
    const {columnName, results, university} =  req.body;
    var msg;
    results.forEach((url)=>{
        dbConnection.query(`INSERT INTO scrappedData (url, columnName, University) VALUES ('${url}', '${columnName}', '${university}')`, function (err, result, fields) {
            if (err) throw err;
            msg = result;
        })
    })
    console.log("posted to the table")
    res.send(msg);

}

function insertIntoTable(req, res){
    const {results, dictionary, targetColumn} =  req.body;
    var msg;
    console.log(dictionary)
    results.forEach((elem)=>{ // use the url as a key for dictioanry to insert data into the target column
        dbConnection.query(`UPDATE scrappedData SET ${targetColumn} = '${dictionary[elem.url]}' where url = '${elem.url}'`, function (err, result, fields) {
            if (err) throw err;
            msg = result;
        })
    })
    
    console.log("done with insertion")
    res.send(msg);
}

module.exports ={
    insertIntoTable: insertIntoTable,
    readFromTable : readFromTable,
    postIntoTable : postIntoTable
}
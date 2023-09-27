const mysql = require("mysql")

var connection  = mysql.createConnection({
    host: "localhost",
    user: "ace",
    password:"A90@1491s",
    database:"webcrawler"
  })

  connection .connect((err)=>{
    if(err){
      console.log("error", err)
      throw err
    };
    console.log("Database connected successfully!")
  })

module.exports = connection ;

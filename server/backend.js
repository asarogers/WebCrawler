const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const {readFromTable, postIntoTable, insertIntoTable} = require("./CRUD.js")
const {scrapeData} = require("./scrapeData.js")

app.use(cors({origin: "*",}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/get-data",(req, res)=>{readFromTable(req, res)})
app.post("/scrap-data",(req, res, next) => {scrapeData(req, res) });
app.post("/post-data",(req, res, next) => {postIntoTable(req, res)})
app.post("/insert-data", (req, res, next)=>{insertIntoTable(req, res)})


var PORT = parseInt(process.env.PORT) + 1 || 3001;
app.listen(PORT, () => {
  console.log(`The server is listen to port ${PORT}`);
});


const puppeteer = require("puppeteer")
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv");
const asyncHandler = require("../src/error/error-handling.js");
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();
const fs = require('fs');
const writeStream = fs.createWriteStream('devBlog.csv');



app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post(
  "/*",
  (req, res, next) => {
    const pwd = req.body.password;
    const {url, element, tag} = req.body;
    const names = []
    console.log(element, url, tag);


    axios.get(url)
        .then(resp => {
            const $ = cheerio.load(resp.data)
            $(element).each((index, element)=>{
                const author = $(element).find(tag).attr('href')
                names.push(author)
            })
            res.send(names)
            
        }).catch(err => console.error(err))
        
      }
);

//var PORT = process.env.PORT || 3053;
var PORT = parseInt(process.env.PORT) + 1 || 3001;

app.listen(PORT, () => {
  console.log(`The server is listen to port ${PORT}`);
});


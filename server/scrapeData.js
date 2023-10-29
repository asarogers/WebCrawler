const axios = require('axios');
const cheerio = require('cheerio');

function scrapeData(req, res){
    const {url, id, tag, theTag, insideTags, isClass} = req.body;
    const names = []

    //console.log("url",url,"id", id,"inside", insideTags, "class",isClass, " tag", tag, "the tag is", theTag)

    axios.get(url)
        .then(resp => {
            const $ = cheerio.load(resp.data)
            var check;
            if(isClass){
                check = "."+id
            }else{
                check = "#"+id
            }
                       //check = ".profile-summary"
            //console.log($(check))
            // $(check).each((index, elements)=>{
            //     var content;
            //     // console.log(tag ,"works ater")
            //     content = $(elements).find("h3").html()
            //     content = $(elements).find("a").attr(theTag)

            //     console.log(content)
            //     //names.push(content)
            
            // })
            // console.log(names.length, names)

            //console.log( " tag", tag, "the tag is", theTag)
            //console.log("check", check)
            $(check).each((index, elements)=>{
                var content;
                //console.log(tag ,"works ater")
                switch(tag[0]){
                    case "a": //if a tag is provided
                    //console.log(insideTags)
                        if(insideTags){
                            //console.log( " tag", tag, "the tag is", theTag)
                            content = $(elements).find(tag).attr(theTag)
                            console.log(content)
                        }else{
                            content = $(elements).find(tag).html()
                            //console.log( " tag", tag, "the tag is", theTag)
                        }
                        break;
                    case "h"://if h1-h3 is provided
                        //console.log("is working")
                        if(insideTags){
                            //console.log( " tag", tag, "the tag is", theTag)
                            content = $(elements).find(tag).attr(theTag)
                            console.log(content)
                        }else{
                            content = $(elements).find(tag).html()
                        }
                        break;
                    default:
                        console.log("no case provided")
                     break;
                }
                //
                names.push(content)
                console.log(names, "checking")

                //remove anything that is not an email
                // if(content?.includes("@")){
                //     names.push(content)
                //     console.log(names)
                // }else{
                //     //names.push("")
                // }
                //names.push(content)
        
            })

            //console.log(names.length, names)
            res.send(names)

        }).catch(err => console.error(err))
}

module.exports = {scrapeData: scrapeData}



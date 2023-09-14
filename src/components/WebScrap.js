import React, { useState } from "react";
import axios from "../api/axios";

export default function WebScrap() {
    const [divs, setDivs] = useState(false)
    const [tags, setTags] = useState(false)

  async function webscrap() {
    const url = document.getElementById("url").value;
    var tag = document.getElementById("tag").value;
    var element = document.getElementById("element").value;

    divs ? element = "." + element : element = element
    
    console.log(element, "works")

    axios
      .post("/get-data", { url: url, element: element, tag: tag })
         .then((response) => {console.log(response.data)})
         .catch((err)=>console.log(err))
  }

  //ri_person

  return (
    <div className="webscrap-body">
      <div className="webscrap">
        <div className="webscraper-content">
          <button onClick={() => webscrap()}>Search</button>
        </div>
        <div className="webscrapper-item">
          <label> url</label>
          <input id="url"></input>
        </div>
        <div className="webscrapper-item">
          <label> element</label>
          <input id="element"></input>
        </div>
        <div className="webscrapper-item">
            is it a css class?
          <form action="" method="post">
            <input type="radio"  onClick={()=>setDivs(true)}/> Yes
            <input type="radio"  onClick={()=>setDivs(false)}/> No
          </form>
        </div>
        <div className="webscrapper-item">
            Includes element tag?
          <form action="" method="post">
            <input type="radio" onClick={()=>setTags(true)}/> Yes
            <input type="radio" onClick={()=>setTags(false)}/> No
          </form>
        </div>
        {
            tags? <div className="webscrapper-item">
            <label> tag</label>
          <input id="tag"></input>
        </div> :
        <div id="tag">
        </ div>
        }
        <textarea id="results"></textarea>
      </div>
    </div>
  );
}

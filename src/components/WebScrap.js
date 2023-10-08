import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function WebScrap() {
  const [isClass, setIsClass] = useState(false); //boolean variable state
  const [tags, setTags] = useState(false); //boolean varaible state
  const [results, setResults] = useState([]); //empty array state
  const [insideTags, setInsideTags] = useState(false); //boolean varaible state

  // useEffect(()=>{//this is a function that is called everytime an object changes
  //   console.log(results)
  // }, [results]) //the object we watch for a change

  async function webscrap() {
    const url = document.getElementById("url").value; //gets the value of the element called url
    // var tag = document.getElementById("tag").value; //gets the value of the element called tag
    var id = document.getElementById("id").value; //gets the value of the element called element
    var result = document.getElementById("results"); //gets the value of the element called results
    var tag = document.getElementById("tag").value;
    const theTag = document.getElementById("theTag").value;
    //setResults(result.value)a
    axios
      .post("/scrap-data", {
        url: url, //need for url
        id: id, //need when checking for exact element
        tag: tag, // the tag that is being searched for
        isClass: isClass, //checks if it's a class or not
        insideTags: insideTags, //ask if we should look inside or not
        theTag: theTag
      })
      .then((response) => {
        result.value = response.data;
        console.log(response.data)
        setResults(response.data);
      })
      .catch((err) => console.log(err));
  }//dw__email

  async function postToDatabase() {
    const columnName = document.getElementById("columnName").value; //gets the value of the element called url
    const university = document.getElementById("university").value;
    axios
      .post("/post-data", { results: results, columnName: columnName, university: university })
      .then((response) => {
        console.log("front", response.data);
      })
      .catch((err) => console.log(err));
  }

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
          is it a css class?
          <select>
            <option onClick={() => setIsClass(true)}>yes</option>
            <option onClick={() => setIsClass(false)}>no</option>
          </select>
        </div>
        <div className="webscrapper-item">
          <label>
            {isClass === true ? <div>class Name</div> : <div>Id</div>}
          </label>
          <input id="id"></input>
        </div>
        <div className="webscrapper-item">
          Is what you want inside a tag?
          <select>
            <option onClick={() => setInsideTags(true)}>yes</option>
            <option onClick={() => setInsideTags(false)}>no</option>
          </select>
        </div>
        {insideTags ? (
          <>
            <div className="webscrapper-item">
              {" "}
              <label>what tag?</label>
              <input id="tag" />
            </div>
            <div className="webscrapper-item">
            {" "}
            <label>what attribute in the tag?</label>
            <input id="theTag" />
          </div>
          </>
          ) : (
            <>
            <div className="webscrapper-item">
              {" "}
              <label>class for the div?</label>
              <input id="tag" />
            </div>
            <div className="webscrapper-item">
            {" "}
            <label>what attribute in the tag?</label>
            <input id="theTag" />
          </div>
            </>
          )}
        <textarea id="results"></textarea>
        <div className="webscrapper-item">
          <button onClick={() => postToDatabase()}>Post</button>
        </div>
        <div className="webscrapper-item">
          <label> column Name</label>
          <input id="columnName"></input>
        </div>
        <div className="webscrapper-item">
          <label> University</label>
          <input id="university"></input>
        </div>
      </div>
    </div>
  );
}

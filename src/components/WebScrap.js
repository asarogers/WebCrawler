import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Select from "react-select";

export default function WebScrap() {
  const [isClass, setIsClass] = useState(false); //boolean variable state
  const [data, setData] = useState({
    folder: [],
    selectedData: ""
  }); //empty array
  const [results, setResults] = useState([]); //empty array state
  const [insideTags, setInsideTags] = useState(false); //boolean varaible state

  const customStyles = {
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgb(250, 250, 250)",
      background: "#cf7d03", // Custom colour
    }),
  };

  useEffect(() => {
    //on load get the data
    onLoad();
  }, []); //the object we watch for a change

  async function onLoad() {
    axios
      .get("/get-tableNames")
      .then((res) => {
        const object = [];

        res.data?.forEach((element, value) => {
          const names = element.names ? element.names : "other"; //
          // const thing = object.filter(elem => elem.label !== element.folder && elem.value !== value)
          if (
            object //names
              .map((arrays) => arrays.label) //check if label exist within the array
              .indexOf(names.replace(/^.+\//g, "")) === -1 //if it does not exist
          )
            //                              /^.+h/
            object.push({
              //then we add the columnName as a label to the list
              label: names.replace(/^.+\//g, ""),
              value: value,
            });
        });
        const searchData = res.data.map(({ ...items }) => {
          return { ...items, id: items["_id"] };
        });

        // //console.log(object)
        setData((prev) => ({
          ...prev,
          folder: object,
        }));
      })
      .catch((err) => console.log(err));
  }

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
        theTag: theTag,
      })
      .then((response) => {
        result.value = response.data;
        console.log(response.data);
        setResults(response.data);
      })
      .catch((err) => console.log(err));
  } //dw__email

  async function postToDatabase() {
    const columnName = document.getElementById("columnName").value; //gets the value of the element called url
    const university = document.getElementById("university").value;
    
    axios
      .post("/post-data", {
        results: results,
        columnName: columnName,
        university: university,
        database: data.selectedData
      })
      .then((response) => {
        console.log("front", response.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="webscrap-body">
      <div className="webscrap">
        <div className="webscrapper-item">
          <h1>Insert URL</h1>
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
        <div className="webscraper-content">
          <button onClick={() => webscrap()}>Search</button>
        </div>
        <textarea id="results"></textarea>
        <div className="webscrapper-item">
          <Select
            id="selector"
            styles={customStyles}
            options={data.folder}
            placeholder="Selected Database?"
            defaultValue={"scrappeddata"}
            onChange={(e) => {
              setData({
                ...data,
                selectedData: e.label
              });
            }}
          ></Select>
        </div>
        <div className="webscrapper-item">
          <label> column Name</label>
          <input id="columnName"></input>
        </div>
        <div className="webscrapper-item">
          <label> University</label>
          <input id="university"></input>
        </div>
        <div className="webscrapper-item">
          <button onClick={() => postToDatabase()}>Post</button>
        </div>
      </div>
    </div>
  );
}

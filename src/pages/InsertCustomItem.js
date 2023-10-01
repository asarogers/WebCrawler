import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function InsertCustomItem() {
  const [data, setData] = useState({
    returnedData: [],
    folder: [],
    selectedData: [],
    searchData: [],
    cartItems: [],
    totalPrice: 0,
  }); //empty array
  const dictionary = {};
  const [startingPoint, setStartingPoint] = useState(Number);
  const [targetColumn, setTargetColumn] = useState([]);
  const [isClass, setIsClass] = useState(false); //boolean variable state
  const [insideTags, setInsideTags] = useState(false); //boolean varaible state

  const customStyles = {
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgb(250, 250, 250)",
      background: "#cf7d03", // Custom colour
    }),
  };

  //   useEffect(() => {
  //     //console.log(data);
  //   }, [data]);

  useEffect(() => {
    axios.get("/get-data").then((res) => {
      const object = [];

      res.data?.forEach((element, value) => {
        const university = element.University ? element.University : "other"; //
        // const thing = object.filter(elem => elem.label !== element.folder && elem.value !== value)
        if (
          object //University
            .map((arrays) => arrays.label) //check if label exist within the array
            .indexOf(university.replace(/^.+\//g, "")) === -1 //if it does not exist
        )
          //                              /^.+h/
          object.push({
            //then we add the columnName as a label to the list
            label: university.replace(/^.+\//g, ""),
            value: value,
          });
      });
      const searchData = res.data.map(({ ...items }) => {
        return { ...items, id: items["_id"] };
      });

      // //console.log(object)
      setData((prev) => ({
        ...prev,
        returnedData: res.data,
        folder: object,
        searchData: searchData,
      }));
    });
  }, []);

  useEffect(() => {
    console.log(data.folder);
  }, [data]);

  // useEffect(()=>{//this is a function that is called everytime an object changes
  //   //console.log(results)
  // }, [results]) //the object we watch for a change



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
    //setResults(result.value)


    //console.log("gathering", tag);
    for (var i = startingPoint - 1; i < data.selectedData.length; i++) {
      const url = data.selectedData[i].url;
      //console.log(url)

      axios
        .post("/scrap-data", {
          url: url,
          id: id,
          tag: tag,
          theTag: theTag,
          insideTags: insideTags,
          isClass: isClass,
        })
        .then((response) => {
          //
          if (response.data) {
            dictionary[url] = response.data;
            console.log(dictionary);
          } else {
            //console.log(dictionary, response.data);
          }
        })

        .catch((err) => console.log(err));
    }
  }

  async function postToDatabase() {
    const columnName = document.getElementById("columnName").value; //gets the value of the element called url
    //const university = document.getElementById("university").value;
    //{results, dictionary, targetColumn}
    axios
      .post("/insert-data", {
        results: data.selectedData,
        targetColumn: columnName,
        dictionary: dictionary,
      })
      .then((response) => {
        //console.log("front", response.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Navbar />
      <div className="webscrap-body">
        <div className="webscrap">
          <div className="webscrapper-item">
            <Select
              id="selector"
              styles={customStyles}
              options={data.folder}
              placeholder="Shop by: CATEGORY"
              onChange={(e) => {
                setTargetColumn(e.label);
                setData({
                  ...data,
                  selectedData: data.returnedData.filter(
                    (elem) => elem.University === e.label
                  ),
                });
              }}
            ></Select>
          </div>
          <div className="webscrapper-item">
            <label> start from</label>
            <input
              id="url"
              placeholder={`from 1 to ${data.selectedData.length}`}
              onChange={(e) => {
                setStartingPoint(e.target.value);
              }}
            ></input>
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
          <button onClick={webscrap}>Search</button>
          <textarea id="results"></textarea>
          <div className="webscrapper-item">
            <button onClick={() => postToDatabase()}>Post</button>
          </div>
          <div className="webscrapper-item">
            <label> column Name</label>
            <input id="columnName"></input>
          </div>
          {/* <div className="webscrapper-item">
            <label> University</label>
            <input id="university"></input>
          </div> */}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Select from "react-select";

export default function SendEmail() {
  const [data, setData] = useState({
    returnedData: [],
    folder: [],
    selectedUniversity: "",
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
  const [emailObj, setEmailObj] = useState({});
  const [nameObj, setNameObj] = useState({});

  const customStyles = {
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgb(250, 250, 250)",
      background: "#cf7d03", // Custom colour
    }),
  };

  //subject
  //body
  //email address
  useEffect(() => {
    axios.get("/get-data").then((res) => {
      const object = [];
      const emails = {};
      const names = {};

      res.data?.forEach((element, value) => {
        const university = element.University ? element.University : "Other"; //
        // const thing = object.filter(elem => elem.label !== element.folder && elem.value !== value)
        const email = element.email ? element.email : "Other";
        const name = element.professorName ? element.professorName : "Other";
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

        if (!emails[university]) {
          emails[university] = [];
          names[university] = [];

          emails[university].push(email);
          names[university].push(name);
        } else {
          emails[university].push(email);
          names[university].push(name);
        }
      });

      object.push({
        //then we add the columnName as a label to the list
        label: "All",
        value: object.length,
      });

      //console.log(emails);
      setEmailObj(emails);
      setNameObj(names);
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

  function SendEmails() {
    var bodyID = document.getElementById("body");
    var emailElement = document.getElementById("email");
    var place = document.getElementById("place");
    console.log(data);
    //get an array of allEmails of the data
    const allEmails = [];
    const allNames = [];

    Object.keys(emailObj).map((key) => {
      allEmails.push(...emailObj[key]);
    });

    Object.keys(nameObj).map((key) => {
      allNames.push(...nameObj[key]);
    });
    var emails, names, selectedEmail, universities, length;
    //filter the data
    if (data.selectedUniversity === "All" || data.selectedUniversity === "") {
      emails = allEmails;
      names = allNames;
      length = allEmails.length;
    } else {
      emails = emailObj[data.selectedUniversity];
      names = nameObj[data.selectedUniversity];
      length = nameObj[data.selectedUniversity].length;
    }
    let i = 0;
    //let check = [7 , 11, 21, 32, 42, 61, 65]
    console.log(names);

    //var body, email;

    wait(2);
    function wait(time) {
      setTimeout(function () {
        if (i < length) {
          const university =
            data.selectedUniversity === "All" || data.selectedUniversity === ""
              ? data.returnedData[i].University
              : data.selectedUniversity;
          const email = emails[i];

          var professorNames = names[i].replaceAll(",", "");
          //console.log(professorNames)
          // name[0] = name[0].replace(",", "")
          var name = professorNames.split(" ").slice(-1);
          //names[i]

          if (name[0].includes("Ph.") || name[0].includes("Director")) {
            console.log(name);
            name = "Dr. " + professorNames.split(" ").slice(-2, -1);
          } else {
            name =
              "Professor " +
              name[0].charAt(0).toUpperCase() +
              name[0].slice(1).toLowerCase();
          }

          //.charAt(0).toUpperCase() + data.selectedUniversity.slice(1).toLowerCase()
          var body =
            "Hello {name}, \nMy name is Asa Rogers,\nI'm a Senior Computer Science student at A&M interested in attending {university}.\nCould I set up a 15 minute call to ask you some questions?\n\n\nThanks, \nFormer President of CS Club, \nAsa Rogers";
          body = body.replace("{name}", name); //replace name
          body = body.replace("{university}", university); //replace university
          place.value = i;
          axios
            .post("/send-email", {
              email: email,
              subject: "1:1 Meeting",
              body: body,
              password: "mvxm tihf etik avzt",
              myEmail: "cyberasasoftware@gmail.com",
              position: i
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log("err", err);
            });

          bodyID.value = body;
          emailElement.value = email;
          i++;
        
          //console.log("works", body);
          wait(time);
        }
      }, time * 1000);
    }
  }

  return (
    <>
      <Navbar />
      <div className="webscrap-body">
        <div className="email">
          <Select
            className="selector"
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
              setData({
                ...data,
                selectedUniversity: e.label,
              });
            }}
          />
          <div className="webscrapper-item">
            <input placeholder="Subject" />
          </div>
          <div className="webscrapper-item">
            <input placeholder="email" id="email" />
          </div>
          <textarea
            id="body"
            className="emailBody"
            placeholder="Body"
          ></textarea>
          <div className="webscrapper-item">
            <input placeholder="position" id="place" />
          </div>
          <button
            onClick={() => {
              SendEmails();
            }}
          >
            Submit{" "}
          </button>
        </div>
      </div>
    </>
  );
}

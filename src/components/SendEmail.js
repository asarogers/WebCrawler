import React from "react";
import Navbar from "../components/Navbar";

export default function SendEmail() {
  //subject
  //body
  //email address
  return (
    <>
      {
        //subject
      }
      <Navbar />
      <div className="webscrap-body">
        <div className="webscrap">
          <textarea id="results"></textarea>
          <div className="webscrapper-item">
            <button>Post</button>
          </div>
          <div className="webscrapper-item">
            <label> column Name</label>
            <input id="columnName"></input>
          </div>
        </div>
      </div>
    </>
  );
}

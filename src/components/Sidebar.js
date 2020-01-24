import React, { Component } from "react";
import fbDatabase from "../firebase";

class Sidebar extends Component {
  firebasePull() {
    console.log("Initial Hello!");
    const fbData = fbDatabase.ref("test");
    fbData.on("value", snap => {
      // const file = snap.val()
      console.log("Second -", snap);
      snap.forEach(child => {
        const childData = child.val();
        console.log("WOAH - ", childData);
      });
    });
  }

  render() {
    return (
      <div className="sideBarFullDiv">
        <p>Sidebar</p>
        <select>
          <option>Test</option>
        </select>
        <button type="button" onClick={this.firebasePull}>
          Click
        </button>
      </div>
    );
  }
}

export default Sidebar;

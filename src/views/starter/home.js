import React, { Component } from "react";
import { GiCompactDisc } from "react-icons/gi";

import "../../App.css";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="heading-color color-item ">
            <GiCompactDisc fill="white" className="App-logo" />
          </div>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

import React from 'react';
import './App.css';


//CONSTANTS
import { screenId } from "./constants.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //initialize state
    this.state = {
        apiResponse: ''
      // screenId: screenId.about,//default to home page
      // width: window.innerWidth//get width of page (for mobile)
    };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
        // .catch(err => err);
    }

  componentWillMount() {
    this.callAPI();
    }
  /*
  Given a screen id, swap to that page
  */
  switchPage = screenId => {
    this.setState({ screenId: screenId });
  };

  //based on this.state.screenId, figure out which page to render!
  getCurrentPage = (mobile) => {
    switch (this.state.screenId) {
      case screenId.about:
        return <div></div>;
      default:
        return <div> 404 page not found {this.state.screenId}</div>; //shouldn't ever reach this
    }
  };

  //render the navbar and the current page being looked at
  render() {
    return (
      <div class="main-container">
        <p className="App-intro">;{this.state.apiResponse}</p>
      </div>
  );
  }
}

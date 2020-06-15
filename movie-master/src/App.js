import React from 'react';
import './App.css';

//CONSTANTS
import { screenId } from "./constants.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //initialize state
    this.state = {
        movies: 'abc'
      // screenId: screenId.about,//default to home page
      // width: window.innerWidth//get width of page (for mobile)
    };
  }

  async callAPI() {
    console.log("enter callapi");
    let response = await fetch("/movies");
    let movies = await response.json();
    this.setState({ movies: JSON.stringify(movies)})
    // console.log("response:", response);
    // console.log("response.json:", await response.json());
    // fetch("/movies")
    //     .then((res) => console.log("result:",res.text());)
    //     .then((res) => res.json());

        // .then(res => JSON)
        // .then(res => {console.log("json:", res)})

    console.log("exit callapi");
}


  async componentWillMount() {
    await this.callAPI();
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
      let movie = this.state.movies;
      console.log("render state",this.state);
    return (
      <div className="main-container">
        <p className="App-intro">;{movie}</p>
      </div>
  );
  }
}

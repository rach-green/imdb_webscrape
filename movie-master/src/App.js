import React from 'react';
import './assets/styles/styles.css';

//CONSTANTS
import { screenId } from "./constants.js";
import Header from "./components/Header.js"; //have to list folder because not on same level
import Footer from "./components/Footer.js";
import Home from "./screens/Home.js"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //initialize state to home screen
    this.state = {
        movies: 'abc',
        screenId: screenId.home//default to home page
      // width: window.innerWidth//get width of page (for mobile)
    };
  }
  //needs to be async function because of awaits
  async callAPI() {
    //if using post or other request, may need to pass method parameter
    let response = await fetch("/allmovies/range/year/2000/2010")//await keyword makes it wait for fetch
    let movies = await response.json();
    this.setState({ movies: JSON.stringify(movies)})
    // console.log("exit callapi");
}


  async componentWillMount() {
    //await this.callAPI();
    }
  /*
  Given a screen id, swap to that page
  */
  switchPage = screenId => {
    this.setState({ screenId: screenId });
  };

  //based on this.state.screenId, figure out which page to render!
  getCurrentPage = () => {
    switch (this.state.screenId) {
      //case ~ if
      case screenId.home:
        return <Home />; //calls home class and returns all HTML it returns
      default:
        return <div> 404 page not found {this.state.screenId}</div>; //shouldn't ever reach this
    }
  };

  //render the navbar and the current page being looked at
  //above return can write in js and grab/calculate any data you want
  //in return you write HTML mayeb with some js variables
  render() {
      return(
          <div className = "main-container">
            <Header switchPage = {this.switchPage}/>
            //curly brackets around anything not HTML
            {this.getCurrentPage()}
            <Footer />
          </div>
      );
  //     let movie = this.state.movies;
  //     console.log("render state",this.state);
  //   return (
  //     <div className="main-container">
  //       <p className="App-intro">;{movie}</p>
  //     </div>
  // );
  }
}

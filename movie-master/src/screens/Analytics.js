import React from 'react';
// import Slider2 from '../components/Slider2';
import Range from '../components/Range';
import Search from '../components/Search';
import RatingButton from '../components/RatingButton';
import Statistic from '../components/Statistic';
import MovieInfo from '../components/MovieInfo';


//export default says return this render function. import this class when you import this file no matter what.
export default class Analytics extends React.Component{//react has a component class
    constructor(props) {
      super(props);
      //initialize state to home screen
      this.state = {
          movies: [],
          selection: {
                    ratings: [],
                    directors: [],
                    cast: [],
                    writers: [],
                    keywords: [],
                    years: []
                    }
      };
    }

    /*this .setState calls render*/
    async callAPI() {
      let selection =  this.state.selection;
      console.log("selection data", JSON.stringify(selection));
      // let response = await fetch(`/all/year/${selection.years[0]}/${selection.years[1]}/0/0/rating/${selection.ratings[selection.ratings.length-1]}/directors/${selection.people[0]}`)//await keyword makes it wait for fetch
      let response = await fetch(`/analytics/${JSON.stringify(selection)}`);
      console.log("fetch complete");
      let movies = await response.json();
      this.setState({ movies: movies});
  }


    async componentDidMount() {
      // await this.callAPI();
    }
    /*if this rating is already in ratings, remove otherwise add.
    filter: returns array without 'rating' b/c we don't have an index*/
    updateRatings = rating => {
        let use = rating;
        if (rating == "NR"){use = "Not Rated"}
        if (this.state.selection.ratings.includes(use)){
            this.state.selection.ratings = this.state.selection.ratings.filter(function(r) {
                return r != use;
            });
        }else{
        this.state.selection.ratings.push(use);}
        console.log("update rating");
        this.callAPI();
        console.log("selection", this.state.selection)
    }

    /*resets array to match the fields array from the Search component*/
    updateDirectors = people => {
        this.state.selection.directors = people;
        console.log("update ");
        this.callAPI();
        console.log("selection", this.state.selection)
    }
    updateCast = people => {
        this.state.selection.cast = people;
        console.log("update ");
        this.callAPI();
        console.log("selection", this.state.selection)
    }

    updateYear = year => {
        if (this.state.selection.years != year){
            this.state.selection.years = year;
            this.callAPI();
        }
        console.log("selection", this.state.selection)
    }

    updateWriters = people => {
        this.state.selection.writers = people;
        console.log("update ");
        this.callAPI();
        console.log("selection", this.state.selection)
    }

    render(){
        return(
            <div className = "analytics-container">
                <div className = "horizantal-line"></div>
                <div className = "filters-container">
                    <div className = "filters-column">
                        <div className = "ratings-div">
                            <div className = "analytics-title">ratings</div>
                            <div className = "ratingbuttons-container">
                                <RatingButton label="NR" update = {this.updateRatings}/>
                                <RatingButton label="TV-MA" update = {this.updateRatings}/>
                                <RatingButton label="R" update = {this.updateRatings}/>
                                <RatingButton label="PG-13" update = {this.updateRatings}/>
                                <RatingButton label="PG" update = {this.updateRatings}/>
                                <RatingButton label="G" update = {this.updateRatings}/>
                            </div>
                        </div>
                        <div className = "range-div">
                            <div className = "analytics-title">years</div>
                            <Range update = {this.updateYear}/>
                        </div>
                    </div>
                    <div className = "filters-column">
                        <div className = "analytics-title">directors</div>
                        <Search update = {this.updateDirectors} title = "directors"/>
                        <div className = "analytics-title">writers</div>
                        <Search update = {this.updateWriters} title = "writers"/>
                    </div>
                    <div className = "filters-column">
                        <div className = "analytics-title">cast</div>
                        <Search update = {this.updateCast} title = "cast"/>
                    </div>
                </div>
                <div className = "horizantal-line"></div>
                <div className = "analytics-content-container">
                    <div className = "analytics-result-container">
                        <div className = "analytics-header">your analytics</div>
                        <div className = "analtics-results">
                            <Statistic header = "average rating" body = "R"/>
                            <Statistic header = "average critic score" body = "9.5"/>
                            <Statistic header = "average gross revenue" body = "$2000000"/>
                            <Statistic header = "average runtime" body = "120min"/>
                            <Statistic header = "average budget" body = "$1000000"/>
                        </div>
                    </div>
                    <div className = "analytics-movies-container">
                        <div className = "analytics-header">your movies</div>
                        <div className = "analytics-movies">
                            {this.state.movies.map((movie, index) => (
                                    <MovieInfo title = {movie['title']} rating = {movie['rating']} year = {movie['year']} genre = {movie['genres']} summary = {movie['summary']}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// <MovieInfo title = "Shawshank Redemption" rating = "R" year = "1994" genre = "Action" summary = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."/>
// <MovieInfo title = "Shawshank Redemption" rating = "R" year = "1994" genre = "Action" summary = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."/>
// <MovieInfo title = "Shawshank Redemption" rating = "R" year = "1994" genre = "Action" summary = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."/>

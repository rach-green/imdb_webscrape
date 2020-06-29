import React from 'react';
// import Slider2 from '../components/Slider2';
import Range from '../components/Range';
import Search from '../components/Search';
import RatingButton from '../components/RatingButton';
import Statistic from '../components/Statistic';
import MovieInfo from '../components/MovieInfo';
import Form from '../components/Form';


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
                    years: [],
                    scores: []
                },
          results: {
                    rating: "none",
                    critic_score: "none",
                    gross: "0",
                    runtime: "none",
                    budget: "0",
                    year: "none"
                }
      };
    }

    /*this .setState calls render*/
    async callAPI() {
      let selection =  this.state.selection;
      selection = JSON.stringify(selection);
      console.log("selection data", JSON.stringify(selection));
      // let response = await fetch(`/all/year/${selection.years[0]}/${selection.years[1]}/0/0/rating/${selection.ratings[selection.ratings.length-1]}/directors/${selection.people[0]}`)//await keyword makes it wait for fetch
      let response = await fetch(`/analytics/${selection}`);
      let movies = await response.json();
      this.setState({ movies: movies});

      // let response2 = await fetch(`/analytics/critic_score/${selection}`);
      // let score = await response2.json();
      // console.log('score', score)
      // this.state.results.critic_score =  ((score[0])['AVG(critic_score)']).toFixed(2)
      //
      // let response3 = await fetch(`/analytics/gross/${selection}`);
      // let gross = await response3.json();
      // console.log('gross', gross)
      // this.state.results.gross =  (gross[0])['AVG(gross)'].toFixed()
      //
      // let response4 = await fetch(`/analytics/runtime/${selection}`);
      // let runtime = await response4.json();
      // console.log('runtime', runtime)
      // this.state.results.runtime =  (runtime[0])['AVG(runtime)'].toFixed()

      let response5 = await fetch(`/avg/${selection}`);
      let score = await response5.json();
      console.log('scores', score);
      console.log('null score', (score[0])['AVG(critic_score)']);
      if (((score[0])['AVG(critic_score)']) != null) {
          this.state.results.critic_score =  ((score[0])['AVG(critic_score)']).toFixed(2)
      }
      else{this.state.results.critic_score = "none"}
      //this.state.results.critic_score =  ((score[0])['AVG(critic_score)']).toFixed(2)
      if (((score[0])['AVG(year)']) != null) {
          this.state.results.year =  ((score[0])['AVG(year)']).toFixed()
      }
      else{this.state.results.year = "none"}
      if (((score[0])['AVG(budget)']) != null) {
          this.state.results.budget =  ((score[0])['AVG(budget)']).toFixed()
      }
      else{this.state.results.budget = "0"}
      if (((score[0])['AVG(gross)']) != null) {
          this.state.results.gross =  ((score[0])['AVG(gross)']).toFixed()
      }
      else{this.state.results.gross = "0"}
      if (((score[0])['AVG(runtime)']) != null) {
          this.state.results.runtime = ((score[0])['AVG(runtime)']).toFixed()
      }
      else{this.state.results.runtime = "none"}

      let response6 = await fetch(`/avg/rating/${selection}`);
      let score2 = await response6.json();
      console.log('scores', score2)
      this.state.results.rating =  ((score2[0])['rating']);

      this.forceUpdate()

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

    updateKeywords = words => {
        this.state.selection.keywords = words;
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

    updateScore = score => {
        if (this.state.selection.scores != score){
            this.state.selection.scores = score;
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

    updateKeywords = words => {
        this.state.selection.keywords = words;
        console.log("update keywords", words);
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
                            <Range min = {1900} max = {2020} step = {1} update = {this.updateYear}/>
                        </div>
                        <div className = "range-div">
                            <div className = "analytics-title">critic score</div>
                            <Range min = {0} max = {10} step = {0.5} update = {this.updateScore}/>
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
                        <div className = "analytics-title">keywords</div>
                        <Form update = {this.updateKeywords}/>
                    </div>
                </div>
                <div className = "horizantal-line"></div>
                <div className = "analytics-content-container">
                    <div className = "analytics-result-container">
                        <div className = "analytics-header">your analytics</div>
                        <div className = "analtics-results">
                            <Statistic header = "average rating" body = {this.state.results.rating}/>
                            <Statistic header = "average critic score" body = {this.state.results.critic_score}/>
                            <Statistic header = "average gross revenue" body = {"$" + this.state.results.gross}/>
                            <Statistic header = "average runtime" body = {this.state.results.runtime+ "min"}/>
                            <Statistic header = "average budget" body = {"$" + this.state.results.budget}/>
                            <Statistic header = "average year released" body = {this.state.results.year}/>
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

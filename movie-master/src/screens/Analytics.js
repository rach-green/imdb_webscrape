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
          movies: [
              {"id":1,"title":"The Shawshank Redemption","year":1994,"rating":"R","critic_score":9.3,"gross":28341469,"runtime":142,"genres":"Drama","summary":"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.","directors":"Frank Darabont","writers":"Stephen King, Frank Darabont","cast":"Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler, Clancy Brown, Gil Bellows, Mark Rolston, James Whitmore, Jeffrey DeMunn, Larry Brandenburg, Neil Giuntoli, Brian Libby, David Proval, Joseph Ragno, Jude Ciccolella","budget":25000000,"languages":"English","storyline":"Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man`s unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red."},
              {"id":2,"title":"The Godfather","year":1972,"rating":"R","critic_score":9.2,"gross":134966411,"runtime":175,"genres":"Crime, Drama","summary":"The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.","directors":"Francis Ford Coppola","writers":"Mario Puzo, Francis Ford Coppola","cast":"Marlon Brando, Al Pacino, James Caan, Richard S. Castellano, Robert Duvall, Sterling Hayden, John Marley, Richard Conte, Al Lettieri, Diane Keaton, Abe Vigoda, Talia Shire, Gianni Russo, John Cazale, Rudy Bond","budget":6000000,"languages":"English, Italian, Latin","storyline":"The Godfather \"Don\" Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter`s wedding. Michael, Vito`s youngest son and a decorated WW II Marine is also present at the wedding. Michael seems to be uninterested in being a part of the family business. Vito is a powerful man, and is kind to all those who give him respect but is ruthless against those who do not. But when a powerful and treacherous rival wants to sell drugs and needs the Don`s influence for the same, Vito refuses to do it. What follows is a clash between Vito`s fading old values and the new ways which may cause Michael to do the thing he was most reluctant in doing and wage a mob war against all the other mafia families which could tear the Corleone family apart."},
              {"id":3,"title":"The Dark Knight","year":2008,"rating":"PG-13","critic_score":9,"gross":534858444,"runtime":152,"genres":"Action, Crime, Drama","summary":"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.","directors":"Christopher Nolan","writers":"Jonathan Nolan, Christopher Nolan","cast":"Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine, Maggie Gyllenhaal, Gary Oldman, Morgan Freeman, Monique Gabriela Curnen, Ron Dean, Cillian Murphy, Chin Han, Nestor Carbonell, Eric Roberts, Ritchie Coster, Anthony Michael Hall","budget":185000000,"languages":"English, Mandarin","storyline":"Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as \"The Joker\" appears in Gotham, creating a new wave of chaos. Batman`s struggle against The Joker becomes deeply personal, forcing him to \"confront everything he believes\" and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes."}
          ],
          selection: {
                    ratings: [],
                    people: [],
                    keywords: [],
                    years: [1900,2020]
                    }
      };
    }
    updateRatings = rating => {
        if (this.state.selection.ratings.includes(rating)){
            this.state.selection.ratings = this.state.selection.ratings.filter(function(r) {
                return r != rating;
            });
        }else{
        this.state.selection.ratings.push(rating);}
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
                            <Range />
                        </div>
                    </div>
                    <div className = "filters-column">
                        <div className = "analytics-title">people</div>
                        <Search />
                    </div>
                    <div className = "filters-column">
                        <div className = "analytics-title">keywords</div>
                        <Search />
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
                                <div key={index} className = "name-button">
                                    <MovieInfo title = {movie['title']} rating = {movie['rating']} year = {movie['year']} genre = {movie['genres']} summary = {movie['summary']}/>
                                </div>
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

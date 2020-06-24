import React from 'react';
// import Slider2 from '../components/Slider2';
import Range from '../components/Range';
import Search from '../components/Search';
import RatingButton from '../components/RatingButton';
import Statistic from '../components/Statistic';
import MovieInfo from '../components/MovieInfo';


//export default says return this render function. import this class when you import this file no matter what.
export default class Analytics extends React.Component{//react has a component class
    render(){
        return(
            <div className = "analytics-container">
                <div className = "horizantal-line"></div>
                <div className = "filters-container">
                    <div className = "filters-column">
                        <div className = "ratings-div">
                            <div className = "analytics-title">ratings</div>
                            <div className = "ratingbuttons-container">
                                <RatingButton label="NR"/>
                                <RatingButton label="TV-MA"/>
                                <RatingButton label="R"/>
                                <RatingButton label="PG-13"/>
                                <RatingButton label="PG"/>
                                <RatingButton label="G"/>
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
                            <MovieInfo title = "Shawshank Redemption" rating = "R" year = "1994" genre = "Action" summary = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

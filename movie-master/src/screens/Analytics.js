import React from 'react';
// import Slider2 from '../components/Slider2';
import Range from '../components/Range';
import Search from '../components/Search';
import RatingButton from '../components/RatingButton';


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
            </div>
        );
    }
}

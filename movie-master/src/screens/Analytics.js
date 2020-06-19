import React from 'react';
// import Slider2 from '../components/Slider2';
import Range from '../components/Range';
import Search from '../components/Search';


//export default says return this render function. import this class when you import this file no matter what.
export default class Analytics extends React.Component{//react has a component class
    render(){
        return(
            <div className = "analytics-container">
                <div className = "range-div">
                    <div className = "analytics-title">years</div>
                    <Range />
                </div>
                <Search />
            </div>
        );
    }
}

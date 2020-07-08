import React from 'react';
import Button from '../components/Button'
import { screenId } from "../constants.js";

//export default says return this render function. import this class when you import this file no matter what.
export default class Home extends React.Component{//react has a component class
    render(){
        return(
            <div className = "home-container">
                <div className = "home-heading">
                    Movie Master tells you more about what you are watching
                </div>
                <p className = "home-paragraph">
                    we use buzz-word to find the best movie for you. we also provide indepth anaylitics on your most important movie questions. we use buzz-word to find the best movie for you. we also provide indepth anaylitics on your most important movie questions.
                </p>
                <div className = "buttons-container">
                    <Button
                    buttonName = "explore our analytics"
                    switchPage = {() => {
                        this.props.switchPage(screenId.analytics);
                    }}
                    />
                    <Button
                    buttonName = "get a reccomendation "
                    switchPage = {() => {
                        this.props.switchPage(screenId.reccomendations);
                    }}
                    />
                </div>

            </div>



        );
    }
}

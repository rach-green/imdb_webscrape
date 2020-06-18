import React from 'react';
//CONSTANTS
import { screenId } from "../constants.js";
import NavButton from "./NavButton.js"

export default class Header extends React.Component{

    render(){
        return(
            <div className = "header-container">
                <div className = "site-logo"/>
                <div className = "nav-buttons-container">
                    <NavButton
                    pageName = "analytics"
                    switchPage = {() => {
                        this.props.switchPage(screenId.analytics);
                    }}
                    />
                    <NavButton
                    pageName = "reccomendations"
                    switchPage = {() => {
                        this.props.switchPage(screenId.reccomendations);
                    }}
                    />
                    <NavButton
                    pageName = "product"
                    switchPage = {() => {
                        this.props.switchPage(screenId.product);
                    }}
                    />
                </div>
            </div>
        );
    }
}

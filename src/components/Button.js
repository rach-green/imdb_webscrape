import React from 'react';

export default class Button extends React.Component{
    render(){
        return(
            <div className = "button-container" onClick = {() => this.props.switchPage()}>
                <div className = "button-text">{this.props.buttonName}</div>
            </div>
        );
    }
}

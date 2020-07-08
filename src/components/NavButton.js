import React from 'react';

export default class NavButton extends React.Component{
    render(){
        return(
            <div className = "nav-button" onClick = {() => this.props.switchPage()}>
                {this.props.pageName}
            </div>
        );
    }
}

import React from 'react';

export default class Statistic extends React.Component{
    render(){
        return(
            <div className= "stat-container">
                <div className = "stat-text-header">
                    {this.props.header}
                </div>
                <div className = "stat-text-body">
                    {this.props.body}
                </div>
            </div>
        );
    }
}

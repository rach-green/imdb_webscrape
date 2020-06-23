import React from 'react';

export default class RatingButton extends React.Component{

    constructor(props) {
      super(props);
      //initialize state to home screen
      this.state = {
          selected: false
      };
    }

    selected = () => {
          this.setState({selected: !this.state.selected});
    };


    render(){
        var name = "unselected-button";
        if(this.state.selected){
            name = "selected-button";
        }
        return(
            <div className = {name}  onClick = {() => this.selected()}>
                {this.props.label}
            </div>
        );
    }
}

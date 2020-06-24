import React from 'react';

export default class MovieInfo extends React.Component{

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
        var name = "movie-info-container-unselected";
        var html = (<div></div>);
        if(this.state.selected){
            name = "movie-info-container-selected";
            html = (<div className = "movieinfo-text-summary">{this.props.summary}</div>);

        }
        return(
            <div className = {name}>
                <div className = "movieinfo-text-title" onClick = {() => this.selected()}>
                    {this.props.title}
                </div>
                <div className = "movieinfo-text-body-container">
                    <div className = "movieinfo-text-body">
                        {this.props.rating}
                    </div>
                    <div className = "movieinfo-text-body">
                        {this.props.year}
                    </div>
                    <div className = "movieinfo-text-body">
                        {this.props.genre}
                    </div>
                </div>
                {html}
            </div>
        );
    }
}

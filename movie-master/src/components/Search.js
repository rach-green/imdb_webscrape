import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'

export default class Search extends Component {

  people = [];

  async callAPI() {
      let title = this.props.title

      //note -> we may want to have table of all directors or have this computation somewhere else - this is temporary
      let response = await fetch("/allmovies/"+title)//fetches array of all directors
      let res = await response.json();//directors in form: [{"directors":"Martin Scorsese, Greta Gerwig"}]
      let build = [];//will store array of directors with no duplicates
      for(var i = 0; i < res.length; i++) { //iterates through each movie's directors string
          if ((res[i])[title]!= null){
          var array = ((res[i])[title]).split(", ")//grabs string of directors and converts to array where each name is one element
          for(var j = 0; j < array.length; j++){//iterates through array of directors
              let director = array[j]
              if (!(build.includes(director))){//adds director to array if not already in
                  build.push(director)
              }
          }
      }
      }
      let data = [];//have to convert array of directors into array of dictionaries for SearchBox [{key: 'name', value: 'name'},{key: 'name', value: 'name'}]
      for(var i = 0; i < build.length; i++){
          let director = build[i];
          let dict = {key: director, value: director};
          data.push(dict);
      }
      this.people = data;
  }
  //componentDidMount gets called after render
  async componentDidMount() {
    await this.callAPI();
    this.forceUpdate()//need to forceUpdate so SearchBox re-renders
    }

  //array storing names that are currently selected/shown below search bar
  fields = []

  //gets called by SearchBox component when a name is clicked on, adding that name to the list shown below
  addField = name => {
    if (!this.fields.includes(name)){//only adds if not already selected
        this.setState({fields: this.fields.push(name)});
    };
    var people = [];
    for(var i = 0; i < this.fields.length; i++){
        people.push((this.fields[i])['key'])
    }
    this.props.update(people)

  };

  //gets called by the x button when clicked, removes name from fields array
  removeField = index => {
    this.setState({fields: this.fields.splice(index, 1)});
    var people = [];
    for(var i = 0; i < this.fields.length; i++){
        people.push((this.fields[i])['key'])
    }
    this.props.update(people)
  };

  render() {
    return (
      <div className = "search-container">
        <ReactSearchBox
        placeholder= "search"
        data={this.people}
        onSelect={record => this.addField(record)}
        dropDownHoverColor = "rgba(15, 76, 129, 0.2)"
        />
        <div className = "search-list">
        {this.fields.map((name, index) => (
            <div key={index} className = "name-button">
                <div className = "name-x-button" onClick = {record => this.removeField(index)}>x</div>
                {name.value}
            </div>
        ))}
        </div>
      </div>
  );
  }
}

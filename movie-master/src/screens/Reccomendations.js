import React from 'react';

//export default says return this render function. import this class when you import this file no matter what.
export default class Reccomendations extends React.Component{//react has a component class
    constructor(props) {
      super(props);
      //initialize state to home screen
      this.state = {
          movies: [],
          selection: {"id":1,"title":"The Shawshank Redemption","year":1994,"rating":"R","critic_score":9.3,"gross":28341469,"runtime":142,"genres":"Drama","summary":"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.","directors":"Frank Darabont","writers":"Stephen King, Frank Darabont","cast":"Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler, Clancy Brown, Gil Bellows, Mark Rolston, James Whitmore, Jeffrey DeMunn, Larry Brandenburg, Neil Giuntoli, Brian Libby, David Proval, Joseph Ragno, Jude Ciccolella","budget":25000000,"languages":"English","storyline":"Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man`s unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red."}
      }
    }

    /*this .setState calls render*/
    async callAPI() {
      let selection =  this.state.selection;
      selection = JSON.stringify(selection);
      console.log("selection data", JSON.stringify(selection));
      // let response = await fetch(`/all/year/${selection.years[0]}/${selection.years[1]}/0/0/rating/${selection.ratings[selection.ratings.length-1]}/directors/${selection.people[0]}`)//await keyword makes it wait for fetch
      let response = await fetch(`/recommendation/${selection}`);
      let movies = await response.json();
      this.setState({ movies: movies});
      console.log("selected movies", movies);

  }

  /*may want a function that uses /allmovies/field/:field/:value' to compare json to json for number of similarities*/

  async componentDidMount() {
    await this.callAPI();
  }
    render(){
        return((<div>Reccomendations</div>));
    }
}

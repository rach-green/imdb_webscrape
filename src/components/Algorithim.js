class Alogorithim {
    constructor(selection_json){
        this.selection = selection_json;
        this.movie_set = [];
        this.top_five = [];
        this.scores = {};
    }

    async getTopFive(){
        await this.getBucket();
        return this.top_five;
    }

    async getBucket() {
      let selection =  this.state.selection;
      selection = JSON.stringify(selection);
      console.log("selection data", JSON.stringify(selection));
      let response = await fetch(`/recommendation/${selection}`);
      let movies = await response.json();
      this.movie_set = movies;

  }

  async getJsons(){
      for(int i = 0; i < this.movie_set.length; i++){
          let response = await fetch(`/allmovies/field/id/${movie_set[i].m_2}`);
          let movie = await response.json();
          /*creating key-pair mapping*/
          scores[movie_set[i].m_2] = this.getScore(movie);
      }
  }

  async getScore(movie){
      
  }

}

class UnFinishedSongs extends React.Component{

  constructor(){
    super()
    this.state = {
      data: [],
      genres: []
    }
    this.grabGenres = this.grabGenres.bind(this);
    this.grabForMe = this.grabForMe.bind(this);
    this.grabTalents = this.grabTalents.bind(this);
  }


componentDidMount(){
  fetch('/unfinished_songs')
  .then((response) => response.json())
  .then((json) => {
    this.setState({data: json})
  });
}


// this is the method to grab only the songs that are recommended
// need to be able to grab array of users genres and talents
// ill iterate over the json obj and create a moc

grabForMe(){
  var myGenres = ["country", "folk"]
  var myTalents = ["Piano"]
  var mySongs = []
  var finalList = []
  // grabs songs that include my desired talents
  for (n in this.state.data){
    for (i in this.state.data[n].desired_talents){
      if (myTalents.includes(this.state.data[n].desired_talents[i].title)){
            mySongs.push(this.state.data[n]);
            break;
        }
    }
  }

// sorts through current song list and selects only songs that include users Genres
  for (n in mySongs){
    for (i in mySongs[n].genres){
      if (myGenres.includes(mySongs[n].genres[i].name)){
        finalList.push(mySongs[n])
      }
    }
  }

  console.log(finalList)
};



// this sorts throught the json obj and grabs the list of genres
// I need it to set the state of this.genres so i can list in the li
grabGenres(){
  var genreListUniq = [];
  var genreList = [];
  for(n in this.state.data){
    for(i in this.state.data[n].genres){
      // check to see if genreList includes genre before push skip part 2
      genreList.push(this.state.data[n].genres[i].name)
    }
  }
  genreList.sort();
  var prev;
  for ( var i = 0; i < genreList.length; i ++){
    if( genreList[i] !== prev){
      genreListUniq.push(genreList[i])
    }
    prev = genreList[i]
  }

return (genreListUniq)
}

// function to grab all talents
grabTalents(){
  var talentListUniq = [];
  var talentList = [];
  for(n in this.state.data){
    for(i in this.state.data[n].desired_talents){
      // check to see if genreList includes genre before push skip part 2
      talentList.push(this.state.data[n].desired_talents[i].title)
    }
  }
  talentList.sort();
  var prev;
  for ( var i = 0; i < talentList.length; i ++){
    if( talentList[i] !== prev){
      talentListUniq.push(talentList[i])
    }
    prev = talentList[i]
  }

return (talentListUniq)

}


  render(){
    return(
      <div className="UnfinishedSongs">
        <div className="Title"> Unfinished </div>

        <div className="UnFinNav">
          <ul>
            <li>Talents</li>
            <li>Genres</li>
            <li>Hot</li>
            <li>New</li>
            <li>For Me</li>
          </ul>
        </div>


        {this.state.data.map((song, i) => {
          return <Song theSong={song} key={i}/>
        })}

        {this.grabGenres()}
        {this.grabForMe()}
        {this.grabTalents()}
      </div>
    )
  };



}

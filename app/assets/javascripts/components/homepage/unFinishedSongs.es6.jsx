class UnFinishedSongs extends React.Component{

  constructor(){
    super()
    this.state = {
      data: [],
      genres: [],
      talents: [],
      forMeList: [],
      hotList: [],
      allSongs: true,
      hot: false,
      forMe: false
    }
    this.grabGenres = this.grabGenres.bind(this);
    this.grabForMe = this.grabForMe.bind(this);
    this.grabTalents = this.grabTalents.bind(this);
    this.sortByHot = this.sortByHot.bind(this);

    this.setToHot = this.setToHot.bind(this);
    this.setToAll = this.setToAll.bind(this);
    this.setForMe = this.setForMe.bind(this);

    this.songsToShow = this.songsToShow.bind(this);
  }


  componentDidMount(){
    fetch('/unfinished_songs')
    .then((response) => response.json())
    .then((json) => {
      this.setState({data: json})
      this.setState({genres: this.grabGenres()})
      this.setState({talents: this.grabTalents()})
      this.setState({forMeList: this.grabForMe()})
    });
  }

  setTalentsAndGenres(){
    this.setState({genres: this.grabGenres()})
    this.setState({talents: this.grabTalents()})
  }

  sortByHot(){
  }

  setToHot(){
    this.setState({hot: true})
    this.setState({allSongs: false})
    this.setState({forMe: false})
  }

  setToAll(){
    this.setState({hot: false})
    this.setState({allSongs: true})
    this.setState({forMe: false})
  }

  setForMe(){
    this.setState({hot: false})
    this.setState({allSongs: false})
    this.setState({forMe: true})
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

    return (finalList)
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
        // check to see if genreList includes genre before push & skip part 2
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


songsToShow(){
  if (this.state.allSongs){
    return (
      <div>
        {this.state.data.map((song, i) => {
          return <Song theSong={song} key={i}/>
        })}
      </div>
    )
  }
  else if (this.state.forMe) {
    return(
      <div>
        {this.state.forMeList.map((song, i) => {
          return <Song theSong={song} key={i}/>
        })}
      </div>
    )
  }
}



  render(){
    return(
      <div className="UnfinishedSongs">
        <div className="Title"> Unfinished </div>

        <div className="UnFinNav">
          <ul>

            <li>Talents:
              <select>
                {this.state.talents.map((talent, i) =>
                   <option key={i} >{talent}</option>
                )}
              </select>
            </li>

            <li>Genres:
              <select>
                {this.state.genres.map((genre, i) =>
                   <option key={i} >{genre}</option>
                )}
              </select>
            </li>

            <li onClick={this.setToHot}>Hot</li>
            <li onClick={this.setToNew}>New</li>
            <li onClick={this.setForMe}>For Me</li>
            <li onClick={this.setToAll}>All</li>

          </ul>
        </div>

        {this.songsToShow()}

      </div>
    )
  };



}

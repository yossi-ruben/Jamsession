class UnFinishedSongs extends React.Component{

  constructor(){
    super()
    this.state = {
      data: [],
      genres: [],
      talents: [],
      forMeList: [],
      hotList: [],
      sortByGenreList: [],
      sortByTalentList: [],
      allSongs: true,
      hot: false,
      forMe: false,
      sortByGenres: false,
      sortByTalents: false
    }
    this.grabGenres = this.grabGenres.bind(this);
    this.grabForMe = this.grabForMe.bind(this);
    this.grabTalents = this.grabTalents.bind(this);
    this.sortByHot = this.sortByHot.bind(this);

    this.setToHot = this.setToHot.bind(this);
    this.setToAll = this.setToAll.bind(this);
    this.setForMe = this.setForMe.bind(this);
    this.setTalentsAndGenres = this.setTalentsAndGenres.bind(this);

    this.setSortByGenresList = this.setSortByGenresList.bind(this);
    this.setSortByTalentsList = this.setSortByTalentsList.bind(this);

    this.songsToShow = this.songsToShow.bind(this);

    this.totalLikes = this.totalLikes.bind(this);

  }


  componentDidMount(){
    fetch('/unfinished_songs')
    .then((response) => response.json())
    .then((json) => {
      this.setState({data: json})
      this.setTalentsAndGenres()
      this.setState({forMeList: this.grabForMe()})
      this.setState({hotList: this.sortByHot()})

    });
  }

  setTalentsAndGenres(){
    this.setState({genres: this.grabGenres()})
    this.setState({talents: this.grabTalents()})
  }

  sortByHot(){
    var songsAndLikes = []

    for(n in this.state.data){
      songsAndLikes.push( [[this.state.data[n]], [this.totalLikes(this.state.data[n])]] )
    }

    songsAndLikes.sort(function(b,a){return a[1] - b[1]})
    return (songsAndLikes)
  }


  totalLikes(song){
    // console.log(song.master_tracks)
   return song.master_tracks.reduce(function(prevValue, currValue){
      // console.log(obj.likes.length)
      return (prevValue + currValue.likes.length)
   },0)
  }


  setToSortByGenres(){
    this.setState({sortByGenres: true})
    this.setState({sortByTalents: false})
    this.setState({hot: false})
    this.setState({allSongs: false})
    this.setState({forMe: false})
  }

  setToSortByTalents(){
    this.setState({sortByTalents: true})
    this.setState({sortByGenres: false})
    this.setState({hot: false})
    this.setState({allSongs: false})
    this.setState({forMe: false})
  }

  setToHot(){
    this.setState({hot: true})
    this.setState({allSongs: false})
    this.setState({forMe: false})
    this.setState({sortByGenres: false})
    this.setState({sortByTalents: false})
  }

  setToAll(){
    this.setState({hot: false})
    this.setState({allSongs: true})
    this.setState({forMe: false})
    this.setState({sortByGenres: false})
    this.setState({sortByTalents: false})
  }

  setForMe(){
    this.setState({hot: false})
    this.setState({allSongs: false})
    this.setState({forMe: true})
    this.setState({sortByGenres: false})
    this.setState({sortByTalents: false})
  }

// this is the method to grab only the songs that are recommended
// need to be able to grab array of users genres and talents
// ill iterate over the json obj and create a moc

  grabForMe(){
    // make sure to add for case where user has no recomendations or is not logged in
    var myGenres = this.props.user_genres || []
    var myTalents = this.props.user_talents || []
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
          break;
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


  setSortByTalentsList(){
    // for(n in this.state.data){
    var songList =  this.state.data.filter((el) => {
      return el.desired_talents.map(function(a) {
        return a.title
      }).includes(this.refs.talent.value)
    })

    this.setState({sortByTalentList: songList});
    this.setToSortByTalents();

      // this.state.data[n].desired_talents.map(function(a) {
      //   return a.title
      // }).includes(this.refs.genre.talents.value)

      // for(i in this.state.data[n].desired_talents){
      //   debugger
      // }
    // }
  }


  setSortByGenresList(){

    var songList = this.state.data.filter((el) =>{
      return el.genres.map(function(a) {
        return a.name
      }).includes(this.refs.genre.value)
    })

    this.setState({sortByGenreList: songList});
    this.setToSortByGenres();
  }


  songsToShow(){
    if (this.state.allSongs) {
      return (
        <div>
          {this.state.data.map((song, i) => {
            return <Song theSong={song} key={i} setSongSrc={this.props.setSongSrc}/>
          })}
        </div>
      )
    }
    else if (this.state.forMe) {
      if (this.state.forMeList.length === 0){
        return (
          <div>
            <p> No songs to Display</p>
          </div>
        )
      }
      else {
        return(
           <div>
            {this.state.forMeList.map((song, i) => {
              return <Song theSong={song} key={i} setSongSrc={this.props.setSongSrc}/>
            })}
          </div>
        )
      }
    }
    else if(this.state.hot) {
      return(
        <div>
          {this.state.hotList.map((song, i) => {
            return <Song theSong={song[0][0]} key={i} setSongSrc={this.props.setSongSrc}/>
          })}
        </div>
      )
    }
    else if(this.state.sortByTalents) {
      return(
        <div>
          {this.state.sortByTalentList.map((song, i) =>{
            return <Song theSong={song} key={i} setSongSrc={this.props.setSongSrc}/>
          })}
        </div>
      )
    }
    else if(this.state.sortByGenres){
      return(
        <div>
          {this.state.sortByGenreList.map((song, i) =>{
            return <Song theSong={song} key={i} setSongSrc={this.props.setSongSrc}/>
          })}
        </div>
      )
    }
  }




  render(){

    return(
      <div className="UnfinishedSongs">
        <h2 id="home-finished-status"> In Progress </h2>

        <div id="UnFinNav">
          <ul id="home-tab">

            <li id="home-tab" type="button" className="btn btn-default">Talents:
              <select ref="talent" onChange={this.setSortByTalentsList}>
                {this.state.talents.map((talent, i) =>
                   <option  key={i} >{talent}</option>
                )}
              </select>
            </li>

            <li id="home-tab" type="button" className="btn btn-default">Genres:
              <select ref="genre" onChange={this.setSortByGenresList}>
                {this.state.genres.map((genre, i) =>
                   <option value={genre.id} key={i} >{genre}</option>
                )}
              </select>
            </li>

            <li id="home-tab" type="button" className="btn btn-default" onClick={this.setToHot}>Hot</li>
            <li id="home-tab" type="button" className="btn btn-default" onClick={this.setToAll}>New</li>
            <li id="home-tab" type="button" className="btn btn-default" onClick={this.setForMe}>Recommended</li>


          </ul>
        </div>

        {this.songsToShow()}

      </div>
    )
  };



}

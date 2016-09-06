class FinishedSongs extends React.Component{

  constructor(){
    super()
    this.state = {
      data: [],
      genres: [],
      recommendedList: [],
      hotList: [],
      randomList: [],
      hot: true,
      recentlylFinished: false,
      random: false,
      recommended: false
    }

    this.grabGenres = this.grabGenres.bind(this);
    this.grabRecommended = this.grabRecommended.bind(this);

    this.sortByHot = this.sortByHot.bind(this);
    this.totalLikes = this.totalLikes.bind(this);


    this.setToHot = this.setToHot.bind(this);
    this.setToRecentlyFinished = this.setToRecentlyFinished.bind(this);
    this.setToRandom = this.setToRandom.bind(this);
    this.setToRecommended = this.setToRecommended.bind(this);


    this.songsToShow = this.songsToShow.bind(this);
    this.randomize = this.randomize.bind(this);
  }

// taken from http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript and is being used for the random function
  randomize() {
    a = this.state.data.slice(0)
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return (a)
  }


  componentDidMount(){
    fetch('/finished_songs')
    .then((response) => response.json())
    .then((json) => {
      this.setState({data: json})
      this.setState({genres: this.grabGenres()})
      this.setState({hotList: this.sortByHot()})
      this.setState({recommendedList: this.grabRecommended()})
      this.setState({randomList: this.randomize()})
    });
  }

  // used to reset what is being displayed start
  setToHot(){
    this.setState({hot: true})
    this.setState({recentlylFinished: false})
    this.setState({random: false})
    this.setState({recommended: false})
  }

  setToRecentlyFinished(){
    this.setState({hot: false})
    this.setState({recentlylFinished: true})
    this.setState({random: false})
    this.setState({recommended: false})
  }

  setToRandom(){
    this.setState({hot: false})
    this.setState({recentlylFinished: false})
    this.setState({random: true})
    this.setState({recommended: false})
  }

  setToRecommended(){
    this.setState({hot: false})
    this.setState({recentlylFinished: false})
    this.setState({random: false})
    this.setState({recommended: true})
  }

// Finish

// used to grab genres
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
// finish

// used to select the hot songs
  sortByHot(){
    var songsAndLikes = []

    for(n in this.state.data){
      songsAndLikes.push( [[this.state.data[n]], [this.totalLikes(this.state.data[n])]] )
    }

    songsAndLikes.sort(function(b,a){return a[1] - b[1]})
    return (songsAndLikes)
  }

  // helper method for sortByHot
  totalLikes(song){
    // console.log(song.master_tracks)
   return song.master_tracks.reduce(function(prevValue, currValue){
      // console.log(obj.likes.length)
      return (prevValue + currValue.likes.length)
   },0)
  }

// finish


  // used to grab recommeded songs
  grabRecommended(){
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
// finish

  songsToShow(){
    if (this.state.hot){
      return (
        <div>
          {this.state.hotList.map((song, i) => {
            return <Song theSong={song[0][0]} key={i}/>
          })}
        </div>
      )
    }
    else if (this.state.recentlylFinished){
      return(
        <div>
          {this.state.data.map((song, i) => {
            return <Song theSong={song} key={i}/>
          })}
        </div>
      )
    }
    else if (this.state.recommended){
      return (
        <div>
          {this.state.recommendedList.map((song, i) =>{
            return <Song theSong={song} key={i}/>
          })}
        </div>
      )
    }
    else if(this.state.random){
      return(
        <div>
          {this.state.randomList.map((song, i) =>{
            return <Song theSong={song} key={i}/>
          })}
        </div>
      )
    }

  }



  render(){

    return(
      <div className="FinishedSongs">
        <div className="Title"> Finished </div>

        <div className="UnFinNav">
          <ul>
            <li>Genres:
              <select>
              {this.state.genres.map((genre, i) =>
                <option key={i}>{genre}</option>
              )}
              </select>
            </li>

            <li onClick={this.setToHot}>Hot</li>
            <li onClick={this.setToRecentlyFinished}>Recently Finished</li>
            <li onClick={this.setToRandom}>Random</li>
            <li onClick={this.setToRecommended}>Recommended</li>
          </ul>
        </div>


        {this.songsToShow()}




      </div>


    )



  }













}

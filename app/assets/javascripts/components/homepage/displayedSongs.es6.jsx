class DisplayedSong extends React.Component {

  constructor(){
    super()
    this.state = {
      unFinished: true,
      finished: false,
      songSrc: "",
      srcKey: 1
    }
    this.songList = this.songList.bind(this);
    this.setSongList = this.setSongList.bind(this);
    this.setSongSrc = this.setSongSrc.bind(this);
    this.inputOfSongSrc = this.inputOfSongSrc.bind(this);
  }


  songList(){
    if (this.state.unFinished){
      return <UnFinishedSongs user_genres={this.props.user_genres} user_talents={this.props.user_talents} setSongSrc={this.setSongSrc} />;
    }
    else {
      return <FinishedSongs user_genres={this.props.user_genres} user_talents={this.props.user_talents} setSongSrc={this.setSongSrc}/>;
    }
  }

  setSongList(){
    if (this.state.unFinished){
      this.setState({unFinished: false});
      this.setState({finished: true});
    }
    else{
      this.setState({unFinished: true});
      this.setState({Finished: false});
    }
  }


    setSongSrc(arg){
      console.log("new source" + arg)
      this.setState({songSrc: arg})
      if (this.state.srcKey === 1){
        this.setState({srcKey: 2})
      }
      else {
        this.setState({srcKey: 1})
      }

    }


    inputOfSongSrc(){
      return(
        <div>
          <AudioFile theSrc={this.state.songSrc} theKey={this.state.srcKey}/>
        </div>
      )
    }


  render(){
    return (
      <div>
        <div id="home-splash" className="jumbotron">
        <img id="home-pic" src="homemusic.png" />
        <p id="front-title">JamSession</p>
        <p id="front-phrase">Making beautiful Music together. Come along for the ride</p>
        </div>

        <div id="home-outtermost" className="container">
          <p className="songToggle" onClick={this.setSongList}> Switch PlayList</p>
          {this.songList()}

          {this.inputOfSongSrc()}

        </div>

      </div>

    // return closing
    )

  // render closing
  };

// class closing
}

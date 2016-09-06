class DisplayedSong extends React.Component {

  constructor(){
    super()
    this.state = {
      unFinished: true,
      finished: false,
      songSrc: []
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
    }

    inputOfSongSrc(){
       {this.state.songSrc}
    }


  render(){
    return (

      <div className="displayedSongs">
        <p className="songToggle" onClick={this.setSongList}> Switch PlayList</p>
        {this.songList()}

        <div className="PlayerComponent">
          <audio controls className="audio-player">
            <source src={this.inputOfSongSrc()} type="audio/mpeg" />
          </audio>


        </div>


      </div>
    // return closing
    )

  // render closing
  };

// class closing
}

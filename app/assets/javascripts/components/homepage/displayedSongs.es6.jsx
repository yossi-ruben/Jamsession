class DisplayedSong extends React.Component {

  constructor(){
    super()
    this.state = {
      unFinished: true,
      finished: false
    }
    this.songList = this.songList.bind(this);
    this.setSongList = this.setSongList.bind(this);
  }


songList(){
  if (this.state.unFinished){
    return <UnFinishedSongs />;
  }
  else {
    return <FinishedSongs />;
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



  render(){
    return (

      <div className="displayedSongs">
        <p>asdf</p>
        <p onClick={this.setSongList}> Switch PlayList</p>
        {this.songList()}
      </div>
    // return closing
    )

  // render closing
  };

// class closing
}

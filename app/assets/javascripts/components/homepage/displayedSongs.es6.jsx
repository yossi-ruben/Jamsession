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
    return <UnFinishedSongs user_genres={this.props.user_genres} user_talents={this.props.user_talents}/>;
  }
  else {
    return <FinishedSongs user_genres={this.props.user_genres} user_talents={this.props.user_talents}/>;
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
        <p className="songToggle" onClick={this.setSongList}> Switch PlayList</p>
        {this.songList()}
      </div>
    // return closing
    )

  // render closing
  };

// class closing
}

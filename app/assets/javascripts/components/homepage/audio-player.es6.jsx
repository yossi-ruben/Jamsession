class AudioFile extends React.Component{

  constructor(){
    super()
    this.state ={
      audioFile: ""
    }
  }

  componentDidUpdate(){
    this.refs.player.play()
  }

  render(){
    return (

      <div className="audio-player-holder">
        <audio ref="player" controls className="audio-player" key={this.props.theKey}>
          <source src={this.props.theSrc} type="audio/mpeg" />
        </audio>
      </div>

    // end return
    )

  // end render
  }



  // end class
}

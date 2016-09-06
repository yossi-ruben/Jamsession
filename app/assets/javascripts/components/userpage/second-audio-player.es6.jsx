class SecondAudioPlayer extends React.Component {
  componentDidMount() {
    this.refs.player.play()
  }

  render() {
    return (
      <audio controls ref="player" className="audio-player">
        <source src={this.props.songPlaying} type="audio/mpeg" / >
      </audio>
    )
  }
}
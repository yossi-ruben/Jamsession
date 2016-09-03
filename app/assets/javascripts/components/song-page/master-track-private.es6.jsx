class MasterTrackPrivate extends React.Component {
  constructor() {
    super();
    this.state = {
      showAudioPlayer: false
    }
    this.toggleShowPlayer = this.toggleShowPlayer.bind(this);
  }

  toggleShowPlayer() {
    this.setState({
      showAudioPlayer: !this.state.showAudioPlayer
    })
  }

  render() {
    let masterTrack = this.props.masterTrack
    return (
      <div className="feature-track-holder">
        <button onClick={this.toggleShowPlayer}>
          { this.state.showAudioPlayer ?
            <p>Hide Audio Player</p>
          :
            <p>Show Audio Player</p>
          }
        </button>
        { this.state.showAudioPlayer ?
          <audio controls className="audio-player">
            <source src="https://mp3-downloading-test-narisi.s3.amazonaws.com/SongTestGuitarBass.mp3" type="audio/mpeg" />
          </audio>
        :
          null
        }
        <p>{masterTrack.description}</p>
      </div>
    )
  }
}
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
          <audio controls>
            <source src={masterTrack.file_path} type="audio/mpeg" />
          </audio>
        :
          null
        }
        <p>{masterTrack.description}</p>
      </div>
    )
  }
}
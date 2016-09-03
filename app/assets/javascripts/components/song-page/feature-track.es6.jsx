class FeatureTrack extends React.Component {
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
    let featureTrack = this.props.featureTrack
    let featureContributor = this.props.featureContributor
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
            <source src="https://mp3-downloading-test-narisi.s3.amazonaws.com/SongTestLeadDrumsSynth.mp3" type="audio/mpeg" />
          </audio>
        :
          null
        }
        <p>{featureTrack.description}</p>
        <p>Contributed by {featureContributor.username}</p>
        <a href={featureTrack.file_path}>Download</a>
      </div>
    )
  }
}
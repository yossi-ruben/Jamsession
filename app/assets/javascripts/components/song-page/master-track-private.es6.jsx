class MasterTrackPrivate extends React.Component {
  constructor() {
    super();
    this.state = {
      showAudioPlayer: false
    }
    this.toggleShowPlayer = this.toggleShowPlayer.bind(this);
    this.deleteMaster = this.deleteMaster.bind(this);
  }

  toggleShowPlayer() {
    this.setState({
      showAudioPlayer: !this.state.showAudioPlayer
    })
  }

  deleteMaster() {
    fetch(`/master_tracks/${this.props.masterTrack.id}`, {
      method: "delete",
      dataType: "JSON",
      headers: {
        "X-CSRF-Token": this.props.csrf,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    .then((response) => response.json())
    .then((json) => {
      this.props.removeMaster(json)
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
            <source src={masterTrack.file_path} type="audio/mpeg" />
          </audio>
        :
          null
        }
        <p>{masterTrack.description}</p>
        <a href={masterTrack.file_path} download>Download</a>
        <button onClick={this.deleteMaster}>Delete this Master Track</button>
      </div>
    )
  }
}
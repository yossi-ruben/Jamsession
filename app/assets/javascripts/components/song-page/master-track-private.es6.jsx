class MasterTrackPrivate extends React.Component {
  constructor() {
    super();
    this.state = {
      showFull: false
    }
    this.toggleShowFull = this.toggleShowFull.bind(this);
    this.deleteMaster = this.deleteMaster.bind(this);
  }

  toggleShowFull() {
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
        <p>{masterTrack.description}</p>
        <button onClick={this.toggleShowFull}>
          { this.state.showFull ?
            <p>Hide Audio Player</p>
          :
            <p>Show Audio Player</p>
          }
        </button>
        { this.state.showAudioPlayer ?
          <div>
            <audio controls className="audio-player">
              <source src={masterTrack.file_path} type="audio/mpeg" />
            </audio>
            <a href={masterTrack.file_path} download>Download</a>
            <button onClick={this.deleteMaster}>Delete this Master Track</button>
          </div>
        :
          null
        }
      </div>
    )
  }
}
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
        <li>{masterTrack.description}</li>
        <button id="normal-button" className="btn btn-default"onClick={this.toggleShowFull}>
          { this.state.showFull ?
            <span> Hide Audio Player</span>
          :
            <span> Show Audio Player</span>
          }
        </button>
        { this.state.showAudioPlayer ?
          <div>
            <audio controls className="audio-player">
              <source src={masterTrack.file_path} type="audio/mpeg" />
            </audio>
            <a href={masterTrack.file_path} download><span className="glyphicon glyphicon-download-alt">  </span>  </a>
            <a href="#" onClick={this.deleteMaster}><span id="trash" className="glyphicon glyphicon-trash">  </span>  </a>
          </div>
        :
          null
        }
      </div>
    )
  }
}
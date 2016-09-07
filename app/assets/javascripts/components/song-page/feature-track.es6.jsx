class FeatureTrack extends React.Component {
  constructor() {
    super();
    this.state = {
      showFull: false
    }
    this.toggleShowFull = this.toggleShowFull.bind(this);
    this.deleteFeature = this.deleteFeature.bind(this);
  }

  toggleShowFull() {
    this.setState({
      showFull: !this.state.showFull
    })
  }

  deleteFeature() {
    fetch(`/feature_tracks/${this.props.featureTrack.id}`, {
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
      this.props.removeFeature(json)
      this.toggleShowFull()
    })
  }

  render() {
    let featureTrack = this.props.featureTrack
    let featureContributor = this.props.featureContributor
    return (
      <div className="feature-track-holder">
        <li>Contributed by <a href={`/users/${featureContributor.id}`}>{featureContributor.username}</a> <span className="small-text">{featureTrack.file_name}</span></li>
        <button id="normal-button" className="btn btn-default" onClick={this.toggleShowFull}>
          { this.state.showFull ?
            <span>Hide Audio Player</span>
          :
            <span>Show Audio Player</span>
          }
        </button>
        { this.state.showFull ?
          <div>
            <audio controls className="audio-player">
              <source src={featureTrack.file_path} type="audio/mpeg" />
            </audio>
            <a href={featureTrack.file_path} download><span className="glyphicon glyphicon-download-alt">  </span>  </a>
            <a href="#" id="normal-button" onClick={this.deleteFeature}><span id="trash" className="glyphicon glyphicon-trash">  </span></a>
            <br/>
            <span>{featureTrack.description}</span>
            <br/>
          </div>
        :
          null
        }
      </div>
    )
  }
}
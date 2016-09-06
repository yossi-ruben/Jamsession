class FeatureTrack extends React.Component {
  constructor() {
    super();
    this.state = {
      showFull: false
    }
    this.toggleShowFull = this.toggleShowFull.bind(this);
  }

  toggleShowFull() {
    this.setState({
      showFull: !this.state.showFull
    })
  }

  render() {
    let featureTrack = this.props.featureTrack
    let featureContributor = this.props.featureContributor
    return (
      <div className="feature-track-holder">
        <p>Contributed by <a href={`/users/${featureContributor.id}`}>{featureContributor.username}</a> <span className="small-text">{featureTrack.file_name}</span></p>
        <button onClick={this.toggleShowFull}>
          { this.state.showFull ?
            <p>Hide Audio Player</p>
          :
            <p>Show Audio Player</p>
          }
        </button>
        { this.state.showFull ?
          <div>
            <audio controls className="audio-player">
              <source src={featureTrack.file_path} type="audio/mpeg" />
            </audio>
            <p>{featureTrack.description}</p>
            <a href={featureTrack.file_path} download>Download</a>
          </div>
        :
          null
        }
      </div>
    )
  }
}
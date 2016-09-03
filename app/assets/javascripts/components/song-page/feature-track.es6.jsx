class FeatureTrack extends React.Component {

  // Need to add ability to 
  render() {
    let featureTrack = this.props.featureTrack
    let featureContributor = this.props.featureContributor
    return (
      <div className="feature-track-holder">
        <audio controls>
          <source src={featureTrack.file_path} type="audio/mpeg" />
        </audio>
        <p>{featureTrack.description}</p>
        <p>Contributed by {featureContributor.username}</p>
      </div>
    )
  }
}
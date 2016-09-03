class TrackCollaborators extends React.Component {
  render() {
    let featureTracks = this.props.featureTracks
    return (
      <ul>
        {featureTracks.map((feature, i) => {
          return <li key={i}>{feature.talent.title} by {feature.user.username}</li>
        })}
      </ul>
    )
  }
}
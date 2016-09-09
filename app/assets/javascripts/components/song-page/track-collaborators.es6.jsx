class TrackCollaborators extends React.Component {
  render() {
    let featureTracks = this.props.featureTracks
    return (
      <ul className="collaborator-list">
        {featureTracks.map((feature, i) => {
          return <li className="collaborator-list-item" key={i}>{feature.talent.title} by <a href={`/users/${feature.user.id}`}>{feature.user.username}</a></li>
        })}
      </ul>
    )
  }
}
class PublicSongView extends React.Component {
  render() {
    return (
      <div>
        <h1 className="song-header">Song Title</h1>
        <h3 className="song-originator">Originated by: username</h3>
        <div className="current-master-view">
          <h2>Current Master:</h2>
          < MasterTrack />
        </div>
        <div className="song-info">
          <p>Put song info here</p>
        </div>
        <div>
          <h3>Master History:</h3>
          < MasterTrack />
          < MasterTrack />
        </div>
        < FeatureSubmission />
      </div>
    )
  }
}
class PublicSongView extends React.Component {
  render() {
    let song = this.props.song
    let songOwner = this.props.songOwner
    let desiredTalents = this.props.desiredTalents
    return (
      <div>
        <h1 className="song-header">{song.title}</h1>
        <h3 className="song-originator">Originated by: {songOwner.username}</h3>
        <div className="current-master-view">
          <h2>Current Master:</h2>
          < MasterTrack />
        </div>
        <div className="song-info">
          <h4>Song Info</h4>
          <ul>
            <li>BPM: {song.bpm}</li>
            <li>Key: {song.key}</li>
            <li>Time Signature: {song.time_signature}</li>
          </ul>
          <h4>Desired Talents:</h4>
          <ul>
            {desiredTalents.map((talent, i) => {
              return <li>{talent.title}</li>
            })}
          </ul>
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
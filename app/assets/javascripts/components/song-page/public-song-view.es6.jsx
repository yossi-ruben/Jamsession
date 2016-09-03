class PublicSongView extends React.Component {
  render() {
    let song = this.props.song
    let songOwner = this.props.songOwner
    let desiredTalents = this.props.desiredTalents
    let currentMasterTrack = this.props.masterTracks[0]
    let genres = this.props.genres
    return (
      <div>
        <h1 className="song-header">{song.title}</h1>
        <h3 className="song-originator">Originated by: {songOwner.username}</h3>
        <div className="current-master-view">
          <h2>Current Master:</h2>
          < MasterTrack masterTrack={currentMasterTrack}/>
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
              return <li key={i}>{talent.title}</li>
            })}
          </ul>
          <h4>Genres:</h4>
          <ul>
            {genres.map((genre, i) => {
              return <li key={i}>{genre.name}</li>
            })}
          </ul>
          <h4>Background</h4>
          <p>{song.background}</p>
        </div>
        <div>
          <h3>Master History:</h3>
        </div>
        < FeatureSubmission />
      </div>
    )
  }
}
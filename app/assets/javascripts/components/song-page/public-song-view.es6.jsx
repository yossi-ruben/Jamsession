class PublicSongView extends React.Component {
  render() {
    let song = this.props.song
    let songOwner = this.props.songOwner
    let desiredTalents = this.props.desiredTalents
    let currentMasterTrack = this.props.masterTracks[this.props.masterTracks.length - 1]
    let genres = this.props.genres
    let masterHistory = this.props.masterTracks.slice(0, this.props.masterTracks.length - 1).reverse()
    return (
    <div>
      { currentMasterTrack === undefined ?
        null
      :
        <div>
          <h1 className="song-header">{song.title}</h1>
          <h3 className="song-originator">Originated by: {songOwner.username}</h3>
          <div className="current-master-view">
            <h2>Current Master:</h2>
              < MasterTrack
                masterTrack={currentMasterTrack} 
                csrf={this.props.csrf}
                currentUser={this.props.currentUser} />
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
            <h1>Master History</h1>
            {masterHistory.map((master, i) => {
              return (
                < MasterTrack 
                  masterTrack={master}
                  currentUser={this.props.currentUser}
                  csrf={this.props.csrf}
                  key={i} />
              )
            })}
          </div>
          < FeatureSubmission
            desiredTalents={this.props.desiredTalents}
            currentUser={this.props.currentUser}
            csrf={this.props.csrf} 
            song={song}
            updateSongAfterFeature={this.props.updateSongAfterFeature} />
        </div>
      }
    </div>
    )
  }
}
class PublicSongView extends React.Component {
    // var masterHistory = this.props.masterTracks.slice(0, this.props.masterTracks.length - 1)
    // masterHistory.sort(function(a,b) {
    //   var c = new Date(a.created_at);
    //   var d = new Date(b.created_at);
    //   return c - d;
    // });

  render() {
    let song = this.props.song
    let songOwner = this.props.songOwner
    let desiredTalents = this.props.desiredTalents
    let currentMasterTrack = this.props.masterTracks.sort(function(a,b) {
      var c = new Date(a.created_at);
      var d = new Date(b.created_at);
      return (d - c)
    })[0]
    let genres = this.props.genres
    let masterHistory = this.props.masterTracks.slice(0, this.props.masterTracks.length - 1).sort(function(a,b) {
      var c = new Date(a.created_at);
      var d = new Date(b.created_at);
      return (d - c);
    })
    return (
    <div>
        <div>
          <h1 className="song-header">{song.title}</h1>
          <h3 className="song-originator">Originated by: {songOwner.username}</h3>
          { song.finished ?
              <h3>This song is marked as finished</h3>
            :
              <h3>This song is open for submissions</h3>
          }
          { currentMasterTrack === undefined ?
              null
            :
              <div className="current-master-view">
                <h2>Current Master:</h2>
                  < MasterTrack
                    masterTrack={currentMasterTrack} 
                    csrf={this.props.csrf}
                    currentUser={this.props.currentUser} />
              </div>
          }
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
          { song.finished ?
              null
            :
              < FeatureSubmission
                desiredTalents={this.props.desiredTalents}
                currentUser={this.props.currentUser}
                csrf={this.props.csrf} 
                song={song}
                updateAfterFeature={this.props.updateAfterFeature} />
          }
        </div>
    </div>
    )
  }
}
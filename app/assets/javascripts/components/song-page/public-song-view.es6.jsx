class PublicSongView extends React.Component {
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
    let masterHistory = this.props.masterTracks.sort(function(a,b) {
      var c = new Date(a.created_at);
      var d = new Date(b.created_at);
      return (d - c)
    }).slice(1, this.props.masterTracks.length)
    return (
    <div>
      <div className="container">
        <div id="master-view" className="table-bordered, jumbotron">
          <h2 className="text-left">{song.title}</h2>
          <h4 className="text-left">Originated by: <a href={`/users/${songOwner.id}`}>{songOwner.username}</a></h4>
          { song.finished ?
              <h3 className="text-left"><small>This song is marked as finished</small></h3>
            :
              <h3 className="text-left"><small>This song is open for submissions</small></h3>
          }
          { currentMasterTrack === undefined ?
              null
            :
              <div className="current-master-view">
                <h4>Current Master:</h4>
                  < MasterTrack
                    masterTrack={currentMasterTrack} 
                    csrf={this.props.csrf}
                    currentUser={this.props.currentUser} />
              </div>
          }
        </div>

          <div id="song-info" className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
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

          <div id="master-history"className="col-lg-9 col-md-9 col-sm-8 col-xs-6">
            <h3 className="text-center">Master History</h3>
            <div>
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
          </div>

          { song.finished ?
              null
            :
              <div>
              { this.props.currentUser.id !== 0 ?
                  < FeatureSubmission
                    desiredTalents={this.props.desiredTalents}
                    currentUser={this.props.currentUser}
                    csrf={this.props.csrf} 
                    song={song}
                    updateAfterFeature={this.props.updateAfterFeature} />
                :
                  null
              }
              </div>
          }
      </div>
    </div>
    )
  }
}
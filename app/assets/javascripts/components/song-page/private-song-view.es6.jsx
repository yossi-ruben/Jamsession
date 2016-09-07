class PrivateSongView extends React.Component {
  constructor() {
    super()
    this.state = {
      talentArray: [],
      playAll: false,
      deleteInitiated: false,
      editFormVisible: false
    }
    this.findAllTalents = this.findAllTalents.bind(this);
    this.playAllSelected = this.playAllSelected.bind(this);
    this.pauseAllSelected = this.pauseAllSelected.bind(this);
    this.resetAllToZero = this.resetAllToZero.bind(this);
    this.initiateDelete = this.initiateDelete.bind(this);
    this.changeMind = this.changeMind.bind(this);
    this.reopenSong = this.reopenSong.bind(this);
    this.closeSong = this.closeSong.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
  }

  componentWillMount() {
    this.findAllTalents();
  }

  initiateDelete() {
    this.setState({
      deleteInitiated: true
    })
  }

  changeMind() {
    this.setState({
      deleteInitiated: false
    })
  }

  reopenSong() {
    fetch(`/songs/${this.props.song.id}/reopen`, {
      method: "PATCH",
      dataType: "JSON",
      headers: {
        "X-CSRF-Token": this.props.csrf,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    .then((response) => response.json())
    .then((json) => {
      this.props.updateSong(json);
    })
  }

  closeSong() {
    fetch(`/songs/${this.props.song.id}/finish`, {
      method: "PATCH",
      dataType: "JSON",
      headers: {
        "X-CSRF-Token": this.props.csrf,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    .then((response) => response.json())
    .then((json) => {
      this.props.updateSong(json);
    })
  }

  toggleEditForm() {
    this.setState({
      editFormVisible: !this.state.editFormVisible
    })
  }

  findAllTalents() {
    var featureTalentArray = []
    this.props.featureTracks.map((feature) => {
      featureTalentArray.push(feature.talent.title)
    })
    var uniqueTalentArray = featureTalentArray.filter((talent, index, self) => {
      return self.indexOf(talent) === index;
    })
    this.setState({
      talentArray: uniqueTalentArray
    })
  }

  playAllSelected() {
    var displayedPlayers = document.getElementsByClassName('audio-player');
    for (var i = 0; i < displayedPlayers.length; i++) {
      if (displayedPlayers[i].currentTime === 0 && displayedPlayers[i].volume !== 0) {
        displayedPlayers[i].volume=0.50;
      }
      displayedPlayers[i].play();
    }
    this.setState({
      playAll: true
    });
  }

  pauseAllSelected() {
    var displayedPlayers = document.getElementsByClassName('audio-player');
    for (var i = 0; i < displayedPlayers.length; i++) {
      displayedPlayers[i].pause();
    }
    this.setState({
      playAll: false
    });
  }

  resetAllToZero() {
    var displayedPlayers = document.getElementsByClassName('audio-player');
    for (var i = 0; i < displayedPlayers.length; i++) {
      displayedPlayers[i].currentTime = 0;
      if (this.state.playAll) {
        displayedPlayers[i].play();
      }
    }
  }

  rewindAll() {
    var displayedPlayers = document.getElementsByClassName('audio-player');
    for (var i = 0; i < displayedPlayers.length; i++) {
      displayedPlayers[i].currentTime = displayedPlayers[i].currentTime - 15; 
    }
  }

  fastForwardAll() {
    var displayedPlayers = document.getElementsByClassName('audio-player');
    for (var i = 0; i < displayedPlayers.length; i++) {
      displayedPlayers[i].currentTime = displayedPlayers[i].currentTime + 15;
    }
  }

  render() {
    let currentMasterTrack = this.props.masterTracks[this.props.masterTracks.length - 1]
    let masterTracks = this.props.masterTracks.sort(function(a,b) {
      var c = new Date(a.created_at);
      var d = new Date(b.created_at);
      return (d - c);
    })
    let featureTracks = this.props.featureTracks
    return (
      <div className="container">
        <div className="jumbotron">
        <h2>{this.props.song.title}</h2>
        { this.props.song.finished ?
            <button onClick={this.reopenSong}>Re-Open this Song for Submissions</button>
          :
            <button onClick={this.closeSong}>Mark this Song as Finished</button>
        }
        { this.state.deleteInitiated ?
            <div>
              <p id="are-you-sure">Are you sure?</p>
              <form action={`/songs/${this.props.song.id}`} method="post">
                <input type="hidden" name="_method" value="delete" />
                <input type="hidden" name="authenticity_token" value={this.props.csrf} />
                <input type="submit" value="Yes" />
              </form>
              <button onClick={this.changeMind}>No, I changed my mind</button>
            </div>
          :
            <button onClick={this.initiateDelete}>Delete This Song</button>
        }
        { this.state.editFormVisible ?
            <button onClick={this.toggleEditForm}>Hide Edit Form</button>
          :
            <button onClick={this.toggleEditForm}>Edit Song Information</button>
        }
        { this.state.editFormVisible ?
            < EditSongForm 
              song={this.props.song}
              allGenres={this.props.allGenres}
              allTalents={this.props.allTalents}
              songGenres={this.props.song.genres}
              desiredTalents={this.props.song.desired_talents}
              updateSong={this.props.updateSong}
              toggleEditForm={this.toggleEditForm}
              csrf={this.props.csrf} />
          :
            null
        }
        </div>


        <div className="jumbotron">
          <h2 className="text-center">Masters</h2>
          {masterTracks.map((master, i) => {
            return (
              < MasterTrackPrivate
                masterTrack={master}
                removeMaster={this.props.removeMaster}
                csrf={this.props.csrf}
                key={i} />
            )
          })}
        </div>

        <div className="jumbotron">
          <h3 className="text-center">Features Included in Most Recent Master</h3>
          {currentMasterTrack.feature_tracks.map((feature, i) => {
            return < FeatureTrack
                     featureTrack={feature}
                     featureContributor={feature.user}
                     removeFeature={this.props.removeFeature}
                     csrf={this.props.csrf}
                     key={i} />
          })}
        </div>

        <div className="jumbotron">
          <h3 className="text-center">All Features by Talent</h3>
          {this.state.talentArray.map((talent, i) => {
            let featuresWithTalent = featureTracks.filter((feature) => {
                return feature.talent.title === talent
              })
            return (
            <div key={i}>
              <h4>{talent}</h4>
              {featuresWithTalent.map((feature, i) => {
                return < FeatureTrack
                         featureTrack={feature}
                         featureContributor={feature.user}
                         removeFeature={this.props.removeFeature}
                         csrf={this.props.csrf}
                         key={i} />
              })}
            </div>
            )
          })}
        </div>

        <nav className="navbar navbar-inverse navbar-fixed-bottom">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            { this.state.playAll ?
              <li><a href="#" onClick={this.pauseAllSelected}>Pause All</a></li>
            :
              <li><a href="#" onClick={this.playAllSelected}>Play All</a></li>
            }
            <li><a href="#" onClick={this.resetAllToZero}>Reset Selected Tracks</a></li>
            <li><a href="#" onClick={this.rewindAll}> &lt;&lt; </a></li>
            <li><a href="#" onClick={this.fastForwardAll}> &gt;&gt; </a></li>

          { this.props.song.finished ?
              null
            :
              <li>< MasterSubmission 
                song={this.props.song}
                updateAfterMaster={this.props.updateAfterMaster} 
                csrf={this.props.csrf} /></li>
          }
          </ul>

        </div>
        </nav>



      </div>
    )
  }
}
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
      <div>
        <h1>{this.props.song.title}</h1>
        { this.props.song.finished ?
            <button onClick={this.reopenSong}>Re-Open this Song for Submissions</button>
          :
            <button onClick={this.closeSong}>Mark this Song as Finished</button>
        }
        { this.state.deleteInitiated ?
            <div>
              <p>Are you sure?</p>
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
              desiredTalents={this.props.song.desired_talents} />
          :
            null
        }
        <h1>Masters</h1>
        {masterTracks.map((master, i) => {
          return (
            < MasterTrackPrivate
              masterTrack={master}
              removeMaster={this.props.removeMaster}
              csrf={this.props.csrf}
              key={i} />
          )
        })}
        <h1>Features Included in Most Recent Master</h1>
        {currentMasterTrack.feature_tracks.map((feature, i) => {
          return < FeatureTrack
                   featureTrack={feature}
                   featureContributor={feature.user}
                   key={i} />
        })}
        <h1>All Features by Talent</h1>
        {this.state.talentArray.map((talent, i) => {
          let featuresWithTalent = featureTracks.filter((feature) => {
              return feature.talent.title === talent
            })
          return (
          <div key={i}>
            <h3>{talent}</h3>
            {featuresWithTalent.map((feature, i) => {
              return < FeatureTrack
                       featureTrack={feature}
                       featureContributor={feature.user}
                       key={i} />
            })}
          </div>
          )
        })}
        <div className="global-audio-controls">
          { this.state.playAll ?
            <button onClick={this.pauseAllSelected}>Pause All</button>
          :
            <button onClick={this.playAllSelected}>Play All</button>
          }
          <button onClick={this.resetAllToZero}>Reset Selected Tracks</button>
          <button onClick={this.rewindAll}> &lt;&lt; </button>
          <button onClick={this.fastForwardAll}> &gt;&gt; </button>
        </div>
        { this.props.song.finished ?
            null
          :
            < MasterSubmission 
              song={this.props.song}
              updateAfterMaster={this.props.updateAfterMaster} 
              csrf={this.props.csrf} />
        }
      </div>
    )
  }
}
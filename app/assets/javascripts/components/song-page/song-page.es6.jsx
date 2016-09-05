class SongPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showPublic: true,
      showPrivate: false,
      song: {},
      songOwner: {},
      desiredTalents: [],
      masterTracks: [],
      featureTracks: [],
      genres: [],
      csrf: ""
    }
    this.showPublic = this.showPublic.bind(this);
    this.showPrivate = this.showPrivate.bind(this);
    this.updateAfterFeature = this.updateAfterFeature.bind(this);
    this.updateAfterMaster = this.updateAfterMaster.bind(this);
    this.removeMaster = this.removeMaster.bind(this);
  }

  componentWillMount() {
    fetch(`/songs/${this.props.song_id}/info`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          song: json,
          songOwner: json.user,
          desiredTalents: json.desired_talents,
          masterTracks: json.master_tracks,
          featureTracks: json.feature_tracks,
          genres: json.genres
        })
      })

    this.csrfSetter();
  }

  csrfSetter() {
    let metaTags = document.getElementsByTagName('meta');
    for (var i = 0; i < metaTags.length; i++) {
      if (metaTags[i].name === 'csrf-token') {
        this.setState({
          csrf: metaTags[i].content
        });
      }
    }
  }

  showPublic() {
    this.setState({
      showPublic: true, showPrivate: false
    })
  }

  showPrivate() {
    this.setState({
      showPublic: false, showPrivate: true
    })
  }

  updateAfterFeature(json) {
    this.setState({
      featureTracks: json
    })
  }

  updateAfterMaster(json) {
    this.setState({
      song: json,
      masterTracks: json.master_tracks,
      featureTracks: json.feature_tracks
    })
  }

  removeMaster(json) {
    this.setState({
      song: json,
      masterTracks: json.master_tracks,
      featureTracks: json.feature_tracks
    })
  }

  render() {
    return (
      <div>
        { this.props.private_user_auth ?
            <div id="song-view-tabs">
              <button onClick={this.showPublic} className="song-view-tab">Public View</button>
              <button onClick={this.showPrivate} className="song-view-tab">Private View</button>
            </div>
          :
            null
        }
        <div className="song-view">
          { this.state.showPublic ? 
              < PublicSongView
                song={this.state.song} 
                songOwner={this.state.songOwner}
                desiredTalents={this.state.desiredTalents}
                masterTracks={this.state.masterTracks}
                genres={this.state.genres}
                currentUser={this.props.currentUser}
                csrf={this.state.csrf}
                updateAfterFeature={this.updateAfterFeature} />
            :
              null
          }
          { this.state.showPrivate ?
              < PrivateSongView 
                song={this.state.song}
                masterTracks={this.state.masterTracks}
                featureTracks={this.state.featureTracks}
                updateAfterMaster={this.updateAfterMaster}
                removeMaster={this.removeMaster}
                csrf={this.state.csrf} />
            :
              null
          }
        </div>
      </div>
    )
  }
}
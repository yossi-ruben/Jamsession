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
    this.updateSong = this.updateSong.bind(this);
    this.removeFeature = this.removeFeature.bind(this);
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

  removeFeature(json) {
    this.setState({
      featureTracks: json
    })
  }

  updateSong(json) {
    this.setState({
      song: json,
      desiredTalents: json.desired_talents,
      genres: json.genres
    })
  }

  render() {
    { this.props.currentUser === null ?
        currentUser = {id: 0, username: ""}
      :
        currentUser = this.props.currentUser
    }
    return (
      <div>
        { this.props.private_user_auth ?
            <div className="container">
            <div className="jumbotron" id="song-view-tabs">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <button onClick={this.showPublic} type="button" className="btn btn-primary btn-block">Public View</button>
              </div>
              
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <button onClick={this.showPrivate} type="button" className="btn btn-primary btn-block">Private View</button>
              </div>
            </div>
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
                currentUser={currentUser}
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
                updateSong={this.updateSong}
                allGenres={this.props.allGenres}
                allTalents={this.props.allTalents}
                removeFeature={this.removeFeature}
                csrf={this.state.csrf} />
            :
              null
          }
        </div>
      </div>
    )
  }
}

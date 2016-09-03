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
      genres: []
    }
    this.showPublic = this.showPublic.bind(this);
    this.showPrivate = this.showPrivate.bind(this);
  }

  componentWillMount() {
    fetch(`/songs/${this.props.song_id}/info`)
      .then((response) => response.json())
      .then((json) => {
        debugger;
        this.setState({
          song: json,
          songOwner: json.user,
          desiredTalents: json.desired_talents,
          masterTracks: json.master_tracks,
          featureTracks: json.feature_tracks,
          genres: json.genres
        })
      })
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
                genres={this.state.genres} />
            :
              null
          }
          { this.state.showPrivate ?
              <p>Private View</p>
            :
              null
          }
        </div>
      </div>
    )
  }
}
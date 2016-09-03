class SongPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showPublic: true,
      showPrivate: false,
      song: {}
    }
    this.showPublic = this.showPublic.bind(this);
    this.showPrivate = this.showPrivate.bind(this);
  }

  componentDidMount() {
    fetch(`/songs/${this.props.song_id}/info`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          song: json
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
    debugger;
    return (
      <div>
        <div id="song-view-tabs">
          <button onClick={this.showPublic} className="song-view-tab">Public View</button>
          <button onClick={this.showPrivate} className="song-view-tab">Private View</button>
        </div>
        <div className="song-view">
          { this.state.showPublic ? 
              < PublicSongView song={this.state.song}/>
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
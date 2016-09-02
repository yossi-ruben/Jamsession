class SongPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showPublic: true,
      showPrivate: false
    }
    this.showPublic = this.showPublic.bind(this);
    this.showPrivate = this.showPrivate.bind(this);
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
        <div id="song-view-tabs">
          <button onClick={this.showPublic} className="song-view-tab">Public View</button>
          <button onClick={this.showPrivate} className="song-view-tab">Private View</button>
        </div>
        <div className="song-view">
          { this.state.showPublic ? 
              < PublicSongView />
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
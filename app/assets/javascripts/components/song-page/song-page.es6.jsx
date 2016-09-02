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
        <div className="tabs">
          <button onClick={this.showPublic}>Public View</button>
          <button onClick={this.showPrivate}>Private View</button>
        </div>
        { this.state.showPublic ? 
            <p>Public View</p>
          :
            null
        }
        { this.state.showPrivate ?
            <p>Private View</p>
          :
            null
        }
      </div>
    )
  }
}
class MasterTrack extends React.Component {
  constructor() {
    super();
    this.state = {
      displayComments: false,
      displayDescription: false,
      displayCollaborators: false,
      likeCount: 0,
      fans: [],
      likedByUser: false
    }
    this.toggleCommentView = this.toggleCommentView.bind(this);
    this.toggleDescriptionView = this.toggleDescriptionView.bind(this);
    this.toggleCollaboratorView = this.toggleCollaboratorView.bind(this);
    this.addLike = this.addLike.bind(this);
  }

  componentDidMount() {
    this.setState({
      likeCount: this.props.masterTrack.likes.length, 
      fans: this.props.masterTrack.fans.map((fan) => {
        return fan.id
      })
    })
  }

  toggleCommentView() {
    this.setState({
      displayComments: !this.state.displayComments,
      displayDescription: false,
      displayCollaborators: false
    })
  }

  toggleDescriptionView() {
    this.setState({
      displayComments: false,
      displayDescription: !this.state.displayDescription,
      displayCollaborators: false
    })
  }

  toggleCollaboratorView() {
    this.setState({
      displayComments: false,
      displayDescription: false,
      displayCollaborators: !this.state.displayCollaborators
    })
  }

  addLike() {
    let data = {
      user_id: this.props.currentUser.id,
      master_track_id: this.props.masterTrack.id
    }

    fetch('/likes', {
      method: "post",
      dataType: "JSON",
      headers: {
        "X-CSRF-Token": this.props.csrf,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    })
    .then(() => {
      this.setState({
        likeCount: this.state.likeCount + 1,
        fans: this.state.fans.concat([this.props.currentUser.id])
      })
    })
  }


  render() {
    let masterTrack = this.props.masterTrack
    let likeCount = this.state.likeCount
    let fans = this.state.fans
     // The ternary here is because masterTrack is a deeply nested resource, and needs to wait to receive all of its information. Without the ternary, masterTrack tries to render while still undefined, but with the ternary, it will wait until it is defined to render, removing the chance of a loading error.
    return (
      <div>
      { masterTrack === undefined ?
          null
        :
          <div className="master-track-holder">
            <audio controls>
              <source src={masterTrack.file_path} type="audio/mpeg" />
            </audio>
            <p> {likeCount}
              { likeCount === 1 ?
                  <span> Like</span>
                :
                  <span> Likes</span>
              }
            </p>
            { fans.includes(this.props.currentUser.id) ?
                <p>Liked Already</p>
              :
                <button onClick={this.addLike}>Like</button>
            }
            <a href={masterTrack.file_path} download>Download</a>
            <button onClick={this.toggleCommentView}>
              { this.state.displayComments ?
                  <p>Hide Comments</p>
                :
                  <p>Show Comments</p>
              }
            </button>
            <button onClick={this.toggleDescriptionView}>
              { this.state.displayDescription ?
                  <p>Hide Description</p>
                :
                  <p>Show Description</p>
              }
            </button>
            <button onClick={this.toggleCollaboratorView}>
              { this.state.displayCollaborators ?
                  <p>Hide Collaborators</p>
                :
                  <p>Show Collaborators</p>
              }
            </button>
            <div>
              { this.state.displayComments ?
                  < CommentDisplay
                    masterTrack={masterTrack}
                    currentUser={this.props.currentUser}
                    csrf={this.props.csrf} />
                :
                  null
              }
              { this.state.displayDescription ? 
                  <p>{masterTrack.description}</p>
                :
                  null
              }
              { this.state.displayCollaborators ?
                  < TrackCollaborators featureTracks={masterTrack.feature_tracks}/>
                :
                  null
              }
            </div>
          </div>
        }
      </div>
    )
  }
}
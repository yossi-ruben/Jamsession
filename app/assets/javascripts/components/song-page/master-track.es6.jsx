class MasterTrack extends React.Component {
  constructor() {
    super();
    this.state = {
      displayComments: false,
      displayDescription: false,
      displayCollaborators: false,
      likeCount: 0,
      fans: []
    }
    this.toggleCommentView = this.toggleCommentView.bind(this);
    this.toggleDescriptionView = this.toggleDescriptionView.bind(this);
    this.toggleCollaboratorView = this.toggleCollaboratorView.bind(this);
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
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

  removeLike() {
    let data = {
      user_id: this.props.currentUser.id,
      master_track_id: this.props.masterTrack.id
    }

    fetch('/likes', {
      method: "delete",
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
      var index = this.state.fans.indexOf(this.props.currentUser.id)
      var fansArray = this.state.fans
      fansArray.splice(index, 1)
      this.setState({
        likeCount: this.state.likeCount - 1,
        fans: fansArray
      })
    })
  }

  render() {
    let masterTrack = this.props.masterTrack
    let likeCount = this.state.likeCount
    let fans = this.state.fans
     // The ternary here is because masterTrack is a deeply nested resource, and
     // needs to wait to receive all of its information. Without the ternary, masterTrack
     // tries to render while still undefined, but with the ternary, it will wait
     // until it is defined to render, removing the chance of a loading error.
    return (
      <div>
      { masterTrack === undefined ?
          null
        :
          <div className="master-track-holder">
            <audio controls>
              <source src={masterTrack.file_path} type="audio/mpeg" />
            </audio>
            <br/>
                <small> {likeCount}
                  { likeCount === 1 ?
                      <span> Like</span>
                    :
                      <span> Likes</span>
                  }
                </small>
                { this.props.currentUser.id !== 0 ?
                    <div>
                      { fans.includes(this.props.currentUser.id) ?
                          <button type="button" className="btn btn-default btn-sm" onClick={this.removeLike}>
                            <span className="glyphicon glyphicon-thumbs-down"></span> Unike
                          </button>
                        :
                          <button type="button" className="btn btn-default btn-sm" onClick={this.addLike}>
                            <span className="glyphicon glyphicon-thumbs-up"></span> Like
                          </button>
                      }
                      <a href={masterTrack.file_path} download>Download</a>
                    </div>
                  :
                    null
                }


            <div>
              <div id="normal-button" className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <button type="button" className="btn btn-default btn-block" onClick={this.toggleCommentView}>
                  <span className="glyphicon glyphicon-comment"></span>
                  { this.state.displayComments ?
                      <span>  Hide Comments</span>
                    :
                      <span>  Show Comments</span>
                  }
                </button>
              </div>

              <div id="comment-button" className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <button type="button" className="btn btn-default btn-block" onClick={this.toggleDescriptionView}>
                  <span className="glyphicon glyphicon-list"></span>
                  { this.state.displayDescription ?
                      <span>  Hide Description</span>
                    :
                      <span>  Show Description</span>
                  }
                </button>
              </div>

              <div id="comment-button" className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <button type="button" className="btn btn-default btn-block" onClick={this.toggleCollaboratorView}>
                  <span className="glyphicon glyphicon-cd"></span>
                  { this.state.displayCollaborators ?
                      <span>  Hide Collaborators</span>
                    :
                      <span>  Show Collaborators</span>
                  }
                </button>
              </div>
            </div>

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
                  <ul>
                    <li>{masterTrack.description}</li>
                  </ul>  
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
class CommentDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      viewForm: false,
      comments: []
    }
    this.toggleAddCommentForm = this.toggleAddCommentForm.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }

  componentDidMount() {
    this.setState({
      comments: this.props.masterTrack.comments
    })
  }

  toggleAddCommentForm() {
    this.setState({
      viewForm: !this.state.viewForm
    })
  }

  submitComment(e) {
    e.preventDefault();

    let body = this.refs.body

    let data = {
      master_track_id: this.refs.masterTrackID.value,
      user_id: this.refs.userID.value,
      body: body.value
    }

    fetch('/comments', {
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
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        comments: this.state.comments.concat([json]),
        viewForm: false
      })
      body.value="";
    })
  }

  removeComment(comment) {
    var commentID = comment.id
    var commentIDArray = this.state.comments.map((comment) => {
      return comment.id
    })
    var index = commentIDArray.indexOf(commentID)
    var newCommentsArray = this.state.comments
    newCommentsArray.splice(index, 1)
    this.setState({
      comments: newCommentsArray
    })
  }

  render() {
    let masterTrack = this.props.masterTrack;
    return (
      <div>
        { this.state.comments.length === 0 ?
            <p>No comments have been added to this track yet.</p>
          :
            <ul>
              {this.state.comments.map((comment, i) => {
                return ( < TrackComment
                           comment={comment}
                           currentUser={this.props.currentUser}
                           csrf={this.props.csrf}
                           removeComment={this.removeComment}
                           key={i} />
              )})}
            </ul>
        }
        { this.props.currentUser.id !== 0 ?
            <button onClick={this.toggleAddCommentForm}>
              { this.state.viewForm ?
                  <p>Hide Comment Submission Form</p>
                :
                  <p>Add Comment</p>
              }
            </button>
          :
            null
        }
        { this.state.viewForm ?
            <form onSubmit={this.submitComment}>
              <input type="hidden" name="comment[user_id]" ref="userID" value={this.props.currentUser.id} />
              <input type="hidden" name="comment[master_track_id]" ref="masterTrackID" value={masterTrack.id} />
              <textarea name="comment[body]" ref="body" className="form-input"></textarea>
              <input type="submit" value="Add Comment" />
            </form>
          :
            null
        }
      </div>
    )
  }
}
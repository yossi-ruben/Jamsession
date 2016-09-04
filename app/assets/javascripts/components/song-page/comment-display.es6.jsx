class CommentDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      viewForm: false,
      comments: []
    }
    this.toggleAddCommentForm = this.toggleAddCommentForm.bind(this);
    this.submitComment = this.submitComment.bind(this);
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

    let masterTrackID = this.refs.masterTrackID.value
    let userID = this.refs.userID.value
    let body = this.refs.body

    let data = {
      master_track_id: masterTrackID,
      user_id: userID,
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
        comments: this.state.comments.concat([json])
      })
    })
  }

  render() {
    let masterTrack = this.props.masterTrack;
    return (
      <div>
        { masterTrack.comments.length === 0 ?
            <p>No comments have been added to this track yet.</p>
          :
            < TrackComments comments={this.state.comments}/>
        }
        <button onClick={this.toggleAddCommentForm}>
          { this.state.viewForm ?
              <p>Hide Comment Submission Form</p>
            :
              <p>Add Comment</p>
          }
        </button>
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
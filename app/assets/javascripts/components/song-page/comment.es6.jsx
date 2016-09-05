class TrackComment extends React.Component {
  constructor() {
    super();
    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment() {
    fetch(`/comments/${this.props.comment.id}`, {
      method: "delete",
      dataType: "JSON",
      headers: {
        "X-CSRF-Token": this.props.csrf,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    .then((response) => response.json())
    .then((json) => {
      this.props.removeComment(json)
    })
  }

  render() {
    let comment = this.props.comment
    return (
      <div>
      <li>{comment.body} - {comment.user.username}</li>
      { comment.user.id === this.props.currentUser.id ?
          <button onClick={this.deleteComment}>Delete this Comment</button>
        :
          null
      }
      </div>
    )
  }
}
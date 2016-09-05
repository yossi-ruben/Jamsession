class TrackComment extends React.Component {
  constructor() {
    super();
    this.deleteComment = this.deleteComment.bind(this);
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
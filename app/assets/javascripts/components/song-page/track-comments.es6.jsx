class TrackComments extends React.Component {
  render() {
    let comments = this.props.comments
    return (
      <ul>
        {comments.map((comment, i) => {
          return <li key={i}>{comment.body} - {comment.user.username}</li>
        })}
      </ul>
    )
  }
}
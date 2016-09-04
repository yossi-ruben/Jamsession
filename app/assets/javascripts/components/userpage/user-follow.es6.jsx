class UserFollow extends React.Component {
render() {
  let stat = this.props.stat
    return (
      <div>
        <a href={'/users/' + stat.id}>{stat.username}</a>
      </div>

      )
  }
}
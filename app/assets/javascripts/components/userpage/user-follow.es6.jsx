class UserFollow extends React.Component {
render() {
  let stat = this.props.stat
    return (
      <div>
        <a  className="follow-list" href={'/users/' + stat.id}>{stat.username}</a>
      </div>

      )
  }
}

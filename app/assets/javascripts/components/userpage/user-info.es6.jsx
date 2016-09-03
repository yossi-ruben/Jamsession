class UserInfo extends React.Component{
  render(){
    let userStats = this.props.userStats
    let following = this.props.following
    let followers = this.props.followers
    return(
    <aside className="navigation">
      <h3>{userStats.username}</h3>
      <p>Following {following.length}</p>
      <p>Followers {followers.length}</p>
    </aside>

      );
  }
}
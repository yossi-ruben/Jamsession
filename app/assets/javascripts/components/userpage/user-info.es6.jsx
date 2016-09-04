class UserInfo extends React.Component{
  constructor() {
    super();
    this.state = {
      showFollowing: false,
      showFollowers: false
    }
    this.showFollowing = this.showFollowing.bind(this);
    this.showFollowers = this.showFollowers.bind(this);
  }

  showFollowing() {
    this.setState({
      showFollowing: true,
      showFollowers: false
    })
  }

  showFollowers() {
    this.setState({
      showFollowing: false,
      showFollowers: true
    })
  }

  render(){
    let userStats = this.props.userStats
    let following = this.props.following
    let followers = this.props.followers
    return(
    <aside className="navigation">
      <img src={userStats.profile_pic_file_path} />
      <h3>{userStats.username}</h3>
        <div className="follow-view">
          <p><a onClick={this.showFollowing} href="#" className="userlinks">Following {following.length}</a></p>

          { this.state.showFollowing ?
            <div>
                {this.props.following.map((person, i) => {
                  return(
                    <UserFollow stat={person} key={i} />
                    )
                })}
              </div>
            :
            null
          }
          <p><a onClick={this.showFollowers} href="#" className="userlinks">Followers {followers.length}</a></p>

          { this.state.showFollowers ?
            <div>
                {this.props.followers.map((person, i) => {
                  return(
                    <UserFollow stat={person} key={i} />
                    )
                })}
              </div>
            :
            null
          }
        </div>
    </aside>
      );
  }
}



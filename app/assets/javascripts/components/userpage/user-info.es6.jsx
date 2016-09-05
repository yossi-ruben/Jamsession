class UserInfo extends React.Component{
  constructor() {
    super();
    this.state = {
      showFollowing: false,
      showFollowers: false,
      startFollowing: false,
      stopFollowing: true
    }
    this.showFollowing = this.showFollowing.bind(this);
    this.showFollowers = this.showFollowers.bind(this);
    this.startFollowing = this.startFollowing.bind(this);
    this.stopFollowing = this.stopFollowing.bind(this);
  }

  showFollowing() {
    this.setState({
      showFollowing: !this.state.showFollowing
    })
  }

  showFollowers() {
    this.setState({
      showFollowers: !this.state.showFollowers
    })
  }

  startFollowing() {
    let data = {
      user_id: this.props.currentUser.id,
      user_to_follow: this.props.userStats.id
    }
    this.setState({
      startFollowing: true,
      stopFollowing: false
    })
    fetch('/connections', {
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
  }

  stopFollowing() {
    this.setState({
      startFollowing: false,
      stopFollowing: true
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
        <div className="user-follow">
          {this.state.startFollowing ?
            <div>
              <button onClick={this.stopFollowing}>Unfollow</button>
            </div>
            :
            <div>
              <button onClick={this.startFollowing}>Follow</button>
            </div>  
          }

        </div>

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



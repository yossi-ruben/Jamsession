class UserInfo extends React.Component{
  constructor() {
    super();
    this.state = {
      showFollowing: false,
      showFollowers: false
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
    .then((response) => response.json())
    .then((json) => {
      this.props.updateConnects(this.props.currentUser.id, json)
      }
    )
  }

  stopFollowing() {
    let data = {
      user_id: this.props.currentUser.id,
      user_to_follow: this.props.userStats.id
    }
    this.setState({
      startFollowing: false,
      stopFollowing: true
    })
    fetch('/connections', {
      method: "delete",
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
      this.props.removeConnects(json)
    })

  }

  render(){
    let userStats = this.props.userStats
    let following = this.props.following
    let followers = this.props.followers
    let connects = this.props.connects
    return(
    <aside className="navigation">
      <img src={userStats.profile_pic_file_path} />
      <h3>{userStats.username}</h3>
        <div className="display-follow-button">
          { this.props.userStats.id === this.props.currentUser.id ?
            null
            :
          <div className="user-follow">
            { this.props.currentUser.id !== 0 ?
                <div>
                  {connects.includes(this.props.currentUser.id) ?
                    <div>
                      <button className='btn btn-danger' onClick={this.stopFollowing}>Unfollow</button>
                    </div>
                    :
                    <div>
                      <button className='btn btn-primary' onClick={this.startFollowing}>Follow</button>
                    </div>
                  }
                </div>
              :
                null
            }
          </div>
          }
        </div>

        <div className="follow-view follower_border">
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

        <h5><a href="#col1Content" data-toggle="collapse">Talents</a></h5>
        <div id="col1Content" className="collapse in talent_border">
          {this.props.talents.map((tal, i) => {
            return(
              <p key={i}>{tal.title}</p>
              )
          })}
        </div>

        <h5><a href="#col2Content" data-toggle="collapse">Genres</a></h5>
        <div id="col2Content" className="collapse in">
        {this.props.genres.map((genre, i) => {
          return(
            <p key={i}>{genre.name}</p>
            )
        })}
        </div>
    </aside>
      );
  }
}



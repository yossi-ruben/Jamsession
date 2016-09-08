class UserPageView extends React.Component {
  constructor() {
    super();
    this.state = {
      showUserProjects: true,
      showUserLiked: false,
      showUserCollaborated: false,
      userStats: [],
      followers: [],
      following: [],
      connects: [],
      talents: [],
      genres: [],
      songPlaying: "",
      playingKey: true,
      csrf: ""
    }
    this.showUserProjects = this.showUserProjects.bind(this);
    this.showUserLiked = this.showUserLiked.bind(this);
    this.showUserCollaborated = this.showUserCollaborated.bind(this);
    this.updateConnects = this.updateConnects.bind(this);
    this.removeConnects = this.removeConnects.bind(this);
    this.playSong = this.playSong.bind(this);
  }

  componentDidMount() {
    fetch (`/users/${this.props.user_id}/info`)
    .then((response) => response.json())
    .then(function(json) {
      this.setState({userStats: json,
        followers: json.followers,
        following: json.following,
        talents: json.talents,
        genres: json.genres,
        connects: json.followers.map((user) => { return user.id })
      })
    }.bind(this));
    this.csrfSetter();
  }

  csrfSetter() {
    let metaTags = document.getElementsByTagName('meta');
    for (var i = 0; i < metaTags.length; i++) {
      if (metaTags[i].name === 'csrf-token') {
        this.setState({
          csrf: metaTags[i].content
        });
      }
    }
  }

  playSong(file_path) {
    this.setState({
      playingKey: !this.state.playingKey,
      songPlaying: file_path
    })
  }

  updateConnects(id, json) {
    this.setState({
      connects: this.state.connects.concat([id]), followers: this.state.followers.concat([json])
    })
  }

  removeConnects(json) {
    let userID = json.id
    let followersIDs = this.state.followers.map((follower) => {
      return follower.id
    })
    let followerArray = this.state.followers
    let index = followerArray.indexOf(userID)
    followerArray.splice(index, 1)
    this.setState({
      connects: [], followers: followerArray
    })
  }

  showUserProjects() {
    this.setState({
      showUserProjects: true,
      showUserLiked: false,
      showUserCollaborated: false
    })
  }

  showUserLiked() {
    this.setState({
      showUserProjects: false,
      showUserLiked: true,
      showUserCollaborated: false
    })
  }

  showUserCollaborated() {
    this.setState({
      showUserProjects: false,
      showUserLiked: false,
      showUserCollaborated: true
    })
  }

  render(){
    { this.props.currentUser === null ?
        currentUser = {id: 0, username: ""}
      :
        currentUser = this.props.currentUser
    }
    return (
      <div>
        { this.state.userStats === undefined ?
          null
        :
        <div>
          <div className="container">
            < UserInfo genres={this.state.genres} talents={this.state.talents} removeConnects={this.removeConnects} updateConnects={this.updateConnects}connects={this.state.connects}csrf={this.state.csrf} userStats={this.state.userStats} currentUser={currentUser} following={this.state.following} followers={this.state.followers}/>
            <div className="content-column">
              <div id="user-tab">
              <ul id="user-tab">
                <li id="home-tab" type="button" className="btn btn-default" onClick={this.showUserProjects}> {this.state.userStats.username}'s Projects</li>
                <li id="home-tab" type="button" className="btn btn-default" onClick={this.showUserLiked}>Favorites</li>
                <li id="home-tab" type="button" className="btn btn-default" onClick={this.showUserCollaborated}>Collaborated</li>
              </ul>
              </div>
                <div className="user-song-view">
                  { this.state.showUserProjects ?
                      < UserProjects finished={this.props.finished_songs} unfinished={this.props.unfinished_songs} playSong={this.playSong} />
                    :
                      null
                  }
                  { this.state.showUserLiked ?
                      < UserLiked likedSongs={this.props.liked_songs} playSong={this.playSong}/>
                    :
                      null
                  }
                  { this.state.showUserCollaborated ?
                     < UserCollaborated collaborated={this.props.collaborated_songs} playSong={this.playSong} />
                    :
                      null
                  }
                </div>
            </div>
          </div>
        <div className="audio-player-holder">
            < AudioPlayer
              songPlaying={this.state.songPlaying}
              key={this.state.playingKey} />
        </div>
      </div>
      }
      </div>
      );
}}

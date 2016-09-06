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
      csrf: ""
    }
    this.showUserProjects = this.showUserProjects.bind(this);
    this.showUserLiked = this.showUserLiked.bind(this);
    this.showUserCollaborated = this.showUserCollaborated.bind(this);
    this.updateConnects = this.updateConnects.bind(this);
    this.removeConnects = this.removeConnects.bind(this);
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

  updateConnects(id) {
    this.setState({
      connects: this.state.connects.concat([id])
    })
  }

  removeConnects() {
    this.setState({
      connects: []
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
    return(
        <div className="container">
          < UserInfo genres={this.state.genres} talents={this.state.talents} removeConnects={this.removeConnects} updateConnects={this.updateConnects}connects={this.state.connects}csrf={this.state.csrf} userStats={this.state.userStats} currentUser={currentUser} following={this.state.following} followers={this.state.followers}/>
          <div className="content-column">
            <ul className="tab">
              <li><a onClick={this.showUserProjects} href="#" className="tablinks">List of Projects</a></li>
              <li><a onClick={this.showUserLiked} href="#" className="tablinks">Liked</a></li>
              <li><a onClick={this.showUserCollaborated} href="#" className="tablinks">Collaborated</a></li>
            </ul>
              <div className="user-song-view">
                { this.state.showUserProjects ?
                    < UserProjects finished={this.props.finished_songs} unfinished={this.props.unfinished_songs}/>
                  :
                    null
                }
                { this.state.showUserLiked ?
                    < UserLiked likedSongs={this.props.liked_songs}/>
                  :
                    null
                }
                { this.state.showUserCollaborated ?
                   < UserCollaborated collaborated={this.props.collaborated_songs} />
                  :
                    null
                }
              </div>
          </div>
        </div>
      );
}}
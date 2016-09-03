class UserPageView extends React.Component {
  constructor() {
    super();
    this.state = {
      showUserProjects: true,
      showUserLiked: false,
      showUserCollaborated: false,
      userStats: [],
      followers: [],
      following: []
    }
    this.showUserProjects = this.showUserProjects.bind(this);
    this.showUserLiked = this.showUserLiked.bind(this);
    this.showUserCollaborated = this.showUserCollaborated.bind(this);
  }

  componentDidMount() {
    fetch (`/users/${this.props.user_id}/info`)
    .then((response) => response.json())
    .then((json) => {
      this.setState({userStats: json,
        followers: json.followers,
        following: json.following
      })
    });

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
    return(
        <div className="container">
          < UserInfo userStats={this.state.userStats} following={this.state.following} followers={this.state.followers}/>
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
class UserPageView extends React.Component {
  constructor() {
    super();
    this.state = {
      showUserProjects: true,
      showUserLiked: false,
      showUserCollaborated: false
    }
    this.showUserProjects = this.showUserProjects.bind(this);
    this.showUserLiked = this.showUserLiked.bind(this);
    this.showUserCollaborated = this.showUserCollaborated.bind(this);
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
          < UserInfo />
          <div className="content-column">
            <ul className="tab">
              <li><a onClick={this.showUserProjects} href="#" className="tablinks">List of Projects</a></li>
              <li><a onClick={this.showUserLiked} href="#" className="tablinks">Liked</a></li>
              <li><a onClick={this.showUserCollaborated} href="#" className="tablinks">Collaborated</a></li>
            </ul>
              <div className="user-song-view">
                { this.state.showUserProjects ?
                    < UserProjects />
                  :
                    null
                }
                { this.state.showUserLiked ?
                    < UserLiked />
                  :
                    null
                }
                { this.state.showUserCollaborated ?
                   < UserCollaborated />
                  :
                    null
                }
              </div>
          </div>
        </div>
);
}}
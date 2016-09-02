class MasterTrack extends React.Component {
  constructor() {
    super();
    this.state = {
      displayComments: false,
      displayDescription: false,
      displayCollaborators: false
    }
    this.toggleCommentView = this.toggleCommentView.bind(this);
    this.toggleDescriptionView = this.toggleDescriptionView.bind(this);
    this.toggleCollaboratorView = this.toggleCollaboratorView.bind(this);
  }

  toggleCommentView() {
    this.setState({
      displayComments: !this.state.displayComments,
      displayDescription: false,
      displayCollaborators: false
    })
  }

  toggleDescriptionView() {
    this.setState({
      displayComments: false,
      displayDescription: !this.state.displayDescription,
      displayCollaborators: false
    })
  }

  toggleCollaboratorView() {
    this.setState({
      displayComments: false,
      displayDescription: false,
      displayCollaborators: !this.state.displayCollaborators
    })
  }

  render() {
    return (
      <div className="master-track-holder">
        <p>Audio player will go here</p>
        <button onClick={this.toggleCommentView}>
          { this.state.displayComments ?
              <p>Hide Comments</p>
            :
              <p>Show Comments</p>
          }
        </button>
        <button onClick={this.toggleDescriptionView}>
          { this.state.displayDescription ?
              <p>Hide Description</p>
            :
              <p>Show Description</p>
          }
        </button>
        <button onClick={this.toggleCollaboratorView}>
          { this.state.displayCollaborators ?
              <p>Hide Collaborators</p>
            :
              <p>Show Collaborators</p>
          }
        </button>
        <div>
          { this.state.displayComments ?
              <p>Put comments here</p>
            :
              null
          }
          { this.state.displayDescription ? 
              <p>Put description here</p>
            :
              null
          }
          { this.state.displayCollaborators ?
              <p>Put collaborators here</p>
            :
              null
          }
        </div>
      </div>
    )
  }
}
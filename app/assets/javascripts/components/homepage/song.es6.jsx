class Song extends React.Component{

  constructor(){
    super()
    this.state = {
      data: []
    }

  }

  render(){

    return (
      <div className="Song">
        <p>Title: {this.props.theSong.title}</p>
        <p>Description: {this.props.theSong.background}</p>
        <p>LastTime: Updated: {this.props.theSong.updated_at}</p>
        <p>Username: <a href={`/users/${this.props.theSong.owner_id}`}> {this.props.theSong.user.username}</a></p>
      </div>

      )
  }
}

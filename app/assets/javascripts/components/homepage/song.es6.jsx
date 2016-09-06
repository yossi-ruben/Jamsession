class Song extends React.Component{

  constructor(){
    super()
    this.state = {
      data: []
    }
    this.changeSong = this.changeSong.bind(this);
  }

  changeSong(){
    this.props.setSongSrc(this.props.theSong.master_tracks.slice(-1)[0].file_path)
  }

  render(){

    return (
      <div className="Song">
        <p>Title: <a href={`/songs/${this.props.theSong.id}`}>{this.props.theSong.title}</a></p>
        <p>Description: {this.props.theSong.background}</p>
        <p>LastTime: Updated: {this.props.theSong.updated_at}</p>
        <p>Username: <a href={`/users/${this.props.theSong.owner_id}`}> {this.props.theSong.user.username}</a></p>

        <p onClick={this.changeSong}> Play Me! </p>
      </div>

      )
  }
}

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
    let dateObj = new Date(this.props.theSong.updated_at)
    let month = dateObj.getUTCMonth();
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let useMonth = monthNames[month]
    return (
      <div id="song" className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <div id="song-container">
        <img id="song-pic"src={this.props.theSong.img_file_path}/>
        <p id="song-title"><a id="song-title" href={`/songs/${this.props.theSong.id}`}>{this.props.theSong.title}</a></p>
        <p id="song-description">{this.props.theSong.background}</p>
        <p id="song-username"><a id="song-username" href={`/users/${this.props.theSong.owner_id}`}> {this.props.theSong.user.username}</a></p>
        <p id="song-date">{useMonth + " " + day.toString() + " " + year.toString()}</p>

        <p onClick={this.changeSong}> Play Me! </p>
        </div>
      </div>

      )
  }
}

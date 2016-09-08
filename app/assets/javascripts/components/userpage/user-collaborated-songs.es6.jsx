class UserCollaboratedSongs extends React.Component {
  constructor() {
    super();
    this.sendSongToParent = this.sendSongToParent.bind(this);
  }

  sendSongToParent() {
    this.props.playSong(this.props.info.master.file_path)
  }

  render(){
    let info = this.props.info
    let dateObj = new Date(this.props.info.master.updated_at)
    let month = dateObj.getUTCMonth();
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let useMonth = monthNames[month]
    debugger;
    return(
      <div>
      { info === undefined ?
        null
        :
          <div className="collab_song">
            <a  href={'/songs/' + info.song.id}><img className="song_img" src={info.song.img_file_path} alt="Chania" /></a>
            <div className="song_details">
              <a href={'/songs/' + info.song.id}>Song Title: {info.song.title}</a>
              <br/>
              <a href={'/users/' + info.user.id}>User: {info.user.username}</a>
              <h5 className="date">Date: {useMonth + " " + day.toString() + " " + year.toString()}</h5>
              <p>Description: {info.master.description}</p>
              <p>Played {info.talent}</p>
              <button className="round-btn glyphicon glyphicon-play-circle" onClick={this.sendSongToParent}></button>
            </div>
          </div>
    }
      </div>
  );
}}

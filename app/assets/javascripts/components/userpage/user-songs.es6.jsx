class UserSongs extends React.Component {
  constructor() {
    super();
    this.sendSongToParent = this.sendSongToParent.bind(this);
  }

  sendSongToParent() {
    this.props.playSong(this.props.info.master.file_path)
  }

  render(){
    let info = this.props.info.song
    let dateObj = new Date(this.props.info.song.updated_at)
    let month = dateObj.getUTCMonth();
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let useMonth = monthNames[month]
    return(
      <div>
      { info === undefined ?
        null
        :

            <div className="project_song">
            <ul className="details_list">
            <li><a href={'/songs/' + info.id}><img className="song_img" src={info.img_file_path} alt="Chania" /></a></li>
              <div className="song_details">
              <li><button className="round-btn glyphicon glyphicon-play-circle" onClick={this.sendSongToParent}></button></li>
              <li><a href={'/songs/' + info.id}>Title: {info.title}</a></li>
              <li><h5 className="date">{useMonth + " " + day.toString() + " " + year.toString()}</h5></li>
              </div>
            </ul>
            </div>
    }
      </div>
  );
}}

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
            <a href={'/songs/' + info.id}><img className="song_img" src={info.img_file_path} alt="Chania" /></a>
              <div className="song_details">
              <a href={'/songs/' + info.id}>Song Title: {info.title}</a>
              <h5 className="date">{useMonth + " " + day.toString() + " " + year.toString()}</h5>
              <button className="glyphicon glyphicon-play" onClick={this.sendSongToParent}></button>
              </div>
            </div>
    }
      </div>
  );
}}

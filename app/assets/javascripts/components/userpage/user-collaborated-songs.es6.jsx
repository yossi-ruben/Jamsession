class UserCollaboratedSongs extends React.Component {
  render(){
    let info = this.props.info
    let dateObj = new Date(this.props.info.master.updated_at)
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
      <div id="myCarousel" className="carousel slide" data-ride="carousel">

        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <a href={'/songs/' + info.song.id}><img src="https://image.freepik.com/free-icon/music-note_318-102209.png" alt="Chania" /></a>
            <div className="carousel-caption">
              <a href={'/songs/' + info.song.id}>Song Title: {info.song.title}</a>
              <br/>
              <a href={'/users/' + info.user.id}>User: {info.user.username}</a>               
              <h5>Date: {useMonth + " " + day.toString() + " " + year.toString()}</h5>
              <p>Description: {info.master.description}</p>
            </div>
          </div>
        </div>   

      </div>
    }
      </div>
  );
}}
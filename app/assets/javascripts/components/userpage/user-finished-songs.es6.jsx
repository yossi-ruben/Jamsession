class UserFinishedSongs extends React.Component {
  render() {
    return (
      <div className="song">
          <h3 className="finhead">Finished</h3>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            {this.props.finished.map((song, i) => {
              return(
                <UserSongs info={song} playSong={this.props.playSong} key={i} />
                )
            })}
            </div>

      </div>
    )
  }
}

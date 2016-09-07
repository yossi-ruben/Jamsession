class UserUnfinishedSongs extends React.Component {
  render() {
    return (
      <div className="song">
          <h3 className="finhead">Unfinished</h3>
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            {this.props.unfinished.map((song, i) => {
              return(
                <UserSongs info={song} playSong={this.props.playSong} key={i} />
                )
            })}
         <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous </span>
        </a>
        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next </span>
        </a>
        </div>
      </div>
    )
  }
}

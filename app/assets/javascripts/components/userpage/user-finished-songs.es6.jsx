class UserFinishedSongs extends React.Component {
  render() {
    return (
      <div className="song">
          <h3 className="finhead">Complete</h3>

            {this.props.finished.map((song, i) => {
              return(
                <UserSongs info={song} playSong={this.props.playSong} key={i}/>
                )
            })}

      </div>
    )
  }
}

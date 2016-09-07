class UserUnfinishedSongs extends React.Component {
  render() {
    return (
      <div className="song">
          <h3 className="finhead">Unfinished</h3>
            {this.props.unfinished.map((song, i) => {
              return(
                <UserSongs info={song} playSong={this.props.playSong} key={i} />
                )
            })}

      </div>
    )
  }
}

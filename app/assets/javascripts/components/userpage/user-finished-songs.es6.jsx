class UserFinishedSongs extends React.Component {
  render() {
    return (
      <div className="song">
          <h3>Finished</h3>
            {this.props.finished.map((song, i) => {
              return(
                <UserSongs info={song} key={i} />
                )
            })}
      </div>
    )
  }
}
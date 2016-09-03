class UserUnfinishedSongs extends React.Component {
  render() {
    return (
      <div className="song">
          <h3>Unfinished</h3>
            {this.props.unfinished.map((song, i) => {
              return(
                <UserSongs info={song} key={i} />
                )
            })}
      </div>
    )
  }
}
class UserCollaborated extends React.Component {
  render() {
    return (
      <div className="song">
          <h3>Collaborated</h3>
            {this.props.collaborated.map((song, i) => {
              return(
                <UserCollaboratedSongs info={song} key={i} />
                )
            })}
      </div>
    )
  }}
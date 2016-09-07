class UserLiked extends React.Component {
render() {
    return (
      <div className="song">
          <h3>Liked</h3>

            {this.props.likedSongs.map((song, i) => {
              return(
                <UserLikedSongs  info={song} playSong={this.props.playSong} key={i}/>
                )
            })}

      </div>
    )
  }
}

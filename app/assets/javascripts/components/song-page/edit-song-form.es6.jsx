class EditSongForm extends React.Component {
  constructor() {
    super();
    this.editSong = this.editSong.bind(this);
  }

  editSong() {

  }

  render() {
    let songGenreIDs = this.props.songGenres.map((genre) => {
      return genre.id
    })
    let desiredTalentIDs = this.props.desiredTalents.map((talent) => {
      return talent.id
    })
    return (
      <form onSubmit={this.editSong}>
        <label htmlFor="song[title]" className="form-label">Title:</label>
        <input type="text" name="song[title]" ref="title" className="form-input" defaultValue={this.props.song.title} />
        <label htmlFor="song[bpm]" className="form-label">BPM:</label>
        <input type="text" name="song[bpm]" ref="bpm" className="form-input" defaultValue={this.props.song.bpm} />
        <label htmlFor="song[key]" className="form-label">Key:</label>
        <input type="text" name="song[key]" ref="key" className="form-input" defaultValue={this.props.song.key} />
        <label htmlFor="song[time_signature]" className="form-label">Time Signature:</label>
        <input type="text" name="song[time_signature]" ref="time_signature" className="form-input" defaultValue={this.props.song.time_signature} />
        <label htmlFor="song[background]" className="form-label">Background:</label>
        <textarea rows="5" cols="30" name="song[background]" ref="background" defaultValue={this.props.song.background}></textarea>
        <p>Please choose which genres you'd like this song to be labeled with:</p>
        {this.props.allGenres.map((genre, i) => {
          return (
            <span key={i}>
              <input
                type="checkbox"
                name={`genre${genre.id}`}
                defaultChecked={ songGenreIDs.includes(genre.id) ? true : false }
              />
              {genre.name}
              <br/>
            </span>
          )
        })}
        <p>Please choose which talents you still desire for this song:</p>
        {this.props.allTalents.map((talent, i) => {
          return (
            <span key={i}>
              <input
                type="checkbox"
                name={`talent${talent.id}`}
                defaultChecked={ desiredTalentIDs.includes(talent.id) ? true : false }
              />
              {talent.title}
              <br/>
            </span>
          )
        })}
        <input type="submit" value="Edit Song" />
      </form>
    )
  }
}
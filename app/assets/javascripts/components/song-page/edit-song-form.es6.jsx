class EditSongForm extends React.Component {
  constructor() {
    super();
    this.editSong = this.editSong.bind(this);
  }

  findDesiredTalents() {
    var checkedTalentIDs = [];
    var allTalents = document.getElementsByName('desiredTalent');
    for (var i = 0; i < allTalents.length; i++) {
      if (allTalents[i].checked === true) {
        checkedTalentIDs.push(allTalents[i].value)
      }
    }
    return checkedTalentIDs
  }

  findSongGenres() {
    var checkedGenreIDs = [];
    var allGenres = document.getElementsByName('songGenre');
    for (var i = 0; i < allGenres.length; i++) {
      if (allGenres[i].checked === true) {
        checkedGenreIDs.push(allGenres[i].value)
      }
    }
    return checkedGenreIDs
  }

  editSong(e) {
    e.preventDefault();

    let data = {
      songGenres: this.findSongGenres(),
      desiredTalents: this.findDesiredTalents(),
      title: this.refs.title.value,
      bpm: this.refs.bpm.value,
      key: this.refs.key.value,
      time_signature: this.refs.timeSignature.value,
      background: this.refs.background.value
    }

    fetch(`/songs/${this.props.song.id}`, {
      method: "PATCH",
      dataType: "JSON",
      headers: {
        "X-CSRF-Token": this.props.csrf,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
      this.props.updateSong(json)
      this.props.toggleEditForm()
    })
  }

  render() {
    let songGenreIDs = this.props.songGenres.map((genre) => {
      return genre.id
    })
    let desiredTalentIDs = this.props.desiredTalents.map((talent) => {
      return talent.id
    })
    return (
      <div id="edit-class-container"className="container">
      <form onSubmit={this.editSong}>
        <br/>
        <label htmlFor="song[title]" className="form-label">Title:</label>
        <br/>
        <input type="text" name="song[title]" ref="title" className="form-input" defaultValue={this.props.song.title} />
        <br/>
        <label htmlFor="song[bpm]" className="form-label">BPM:</label>
        <br/>
        <input type="text" name="song[bpm]" ref="bpm" className="form-input" defaultValue={this.props.song.bpm} />
        <br/>
        <label htmlFor="song[key]" className="form-label">Key:</label>
        <br/>
        <input type="text" name="song[key]" ref="key" className="form-input" defaultValue={this.props.song.key} />
        <br/>
        <label htmlFor="song[time_signature]" className="form-label">Time Signature:</label>
        <br/>
        <input type="text" name="song[time_signature]" ref="timeSignature" className="form-input" defaultValue={this.props.song.time_signature} />
        <br/>
        <label htmlFor="song[background]" className="form-label">Background:</label>
        <br/>
        <textarea rows="5" cols="30" name="song[background]" ref="background" defaultValue={this.props.song.background}></textarea>
        <p id="normal-14">Please choose which genres you'd like this song to be labeled with:</p>
        {this.props.allGenres.map((genre, i) => {
          return (
            <span key={i}>
              <input
                type="checkbox"
                name="songGenre"
                value={genre.id}
                defaultChecked={ songGenreIDs.includes(genre.id) ? true : false }
              />
              {genre.name}
              <br/>
            </span>
          )
        })}
        <p id="normal-14">Please choose which talents you still desire for this song:</p>
        {this.props.allTalents.map((talent, i) => {
          return (
            <span key={i}>
              <input
                type="checkbox"
                name="desiredTalent"
                value={talent.id}
                defaultChecked={ desiredTalentIDs.includes(talent.id) ? true : false }
              />
              {talent.title}
              <br/>
            </span>
          )
        })}
        <input type="submit" value="Edit Song" />
      </form>
      </div>
    )
  }
}
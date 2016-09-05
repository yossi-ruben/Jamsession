class FeatureSubmission extends React.Component {
  constructor() {
    super();
    this.state = {
      showSubmissionForm: false,
      featureFile: null,
      currentlyUploading: false,
      uploadComplete: false
    }
    this.toggleFormView = this.toggleFormView.bind(this);
    this.submitFeature = this.submitFeature.bind(this);
    this.changeFile = this.changeFile.bind(this);
  }

  toggleFormView() {
    this.setState({
      showSubmissionForm: !this.state.showSubmissionForm
    })
  }

  changeFile(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
    var that = this;

    reader.onloadend = function() {
      that.setState({ featureFile: file });
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ featureFile: null});
    }
  }

  submitFeature(e) {
    e.preventDefault();

    this.setState({
      currentlyUploading: true
    })

    let userID = this.refs.trackUser.value
    let description = this.refs.trackDescription
    let talentID = this.refs.trackTalent.value
    let file = this.state.featureFile
    let songID = this.refs.trackSong.value

    var formData = new FormData();
    formData.append("feature_track[user_id]", userID);
    formData.append("feature_track[description]", description.value);
    formData.append("feature_track[talent_id]", talentID);
    formData.append("feature_track[file]", file);
    formData.append("feature_track[song_id]", songID);

    fetch(`/feature_tracks`, {
      method: "post",
      dataType: "JSON",
      headers: {
          "X-CSRF-Token": this.props.csrf,
        },
      credentials: "include",
      body: formData
    })
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        currentlyUploading: false,
        uploadComplete: true,
        showSubmissionForm: false
      })
      this.props.updateAfterFeature(json)
      description.value = "";
    })
  }

  render() {
    return (
      <div className="submission-form-holder">
        <button onClick={this.toggleFormView}>
          { this.state.showSubmissionForm ?
              <p>Hide Submission Form</p>
            :
              <p>Submit Feature Track</p>
          }
        </button>
        { this.state.currentlyUploading ?
            <p>Uploading File...</p>
          :
            null
        }
        { this.state.uploadComplete ?
            <p>Upload Complete!</p>
          :
            null
        }
        { this.state.showSubmissionForm ?
            <div className="form-holder">
              <h3>Upload a Feature Track</h3>
              <form encType="multipart/form-data" onSubmit={this.submitFeature}>
                <input type="hidden" name="feature_track[user_id]" ref="trackUser" value={this.props.currentUser.id} />
                <input type="hidden" name="feature_track[song_id]" ref="trackSong" value={this.props.song.id} />
                <label htmlFor="feature_track[description]" className="form-label">Track Description:</label>
                <textarea rows="5" cols="30" name="feature_track[description]" ref="trackDescription"></textarea>
                <label htmlFor="feature_track[talent_id]" className="form-label">What talent does this track correspond with?</label>
                <select ref="trackTalent">
                  {this.props.desiredTalents.map((talent, i) => {
                    return <option value={talent.id} key={i}>{talent.title}</option>
                  })}
                </select>
                <input type="file" name="feature_track[file]" className="form-input" ref="trackFile" onChange={this.changeFile}/>
                <input type="submit" value="Submit Track" className="form-input"/>
              </form>
            </div>
          :
            null
        }
      </div>
    )
  }
}
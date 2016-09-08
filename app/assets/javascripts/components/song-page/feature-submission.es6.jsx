class FeatureSubmission extends React.Component {
  constructor() {
    super();
    this.state = {
      showSubmissionForm: false,
      featureFile: null,
      currentlyUploading: false,
      uploadComplete: false,
      errorsPresent: false,
      errors: []
    }
    this.toggleFormView = this.toggleFormView.bind(this);
    this.submitFeature = this.submitFeature.bind(this);
    this.changeFile = this.changeFile.bind(this);
  }

  toggleFormView() {
    this.setState({
      showSubmissionForm: !this.state.showSubmissionForm,
      errorsPresent: false
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
      if (json.errors) {
        this.setState({
          currentlyUploading: false,
          errorsPresent: true,
          errors: json.errors
        })
      } else {
        this.setState({
          errorsPresent: false,
          currentlyUploading: false,
          uploadComplete: true,
          showSubmissionForm: false
        })
        this.props.updateAfterFeature(json)
        description.value = "";
      }
    })
  }

  render() {
    return (
      <div>
      <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
      </div>
      <div className="col-lg-9 col-md-9 col-sm-8 col-xs-6">
        <button id="button-submit-feature" className="btn btn-success" onClick={this.toggleFormView}>
          { this.state.showSubmissionForm ?
              <span>Hide Submission Form</span>
            :
              <span>Submit Feature Track</span>
          }
        </button>
        { this.state.currentlyUploading ?
            <span>Uploading File...</span>
          :
            null
        }
        { this.state.uploadComplete ?
            <span>Upload Complete!</span>
          :
            null
        }
        { this.state.errorsPresent ?
            < ErrorDisplay errors={this.state.errors} />
          :
            null
        }
        { this.state.showSubmissionForm ?
            <div className="form-holder border-form-div">
              <h4 id="upload-feature-track">Upload a Feature Track</h4>
              <form  id="feature-submit-form" encType="multipart/form-data" onSubmit={this.submitFeature}>
                <input type="hidden" name="feature_track[user_id]" ref="trackUser" value={this.props.currentUser.id} />
                <br/>
                <input type="hidden" name="feature_track[song_id]" ref="trackSong" value={this.props.song.id} />
                <br/>
                <label htmlFor="feature_track[description]" className="form-label">Track Description:</label>
                <br/>
                <textarea rows="5" cols="30" name="feature_track[description]" ref="trackDescription"></textarea>
                <br/>
                <label htmlFor="feature_track[talent_id]" className="form-label">What talent does this track correspond with?</label>
                <br/>
                <select ref="trackTalent">
                  {this.props.desiredTalents.map((talent, i) => {
                    return <option value={talent.id} key={i}>{talent.title}</option>
                  })}
                  <br/>
                </select>
                <br/>
                <input type="file" name="feature_track[file]" className="form-input" ref="trackFile" onChange={this.changeFile}/>
                <br/>
                <input type="submit" value="Submit Track" className="form-input btn btn-primary"/>
              </form>
            </div>
          :
            null
        }
      </div>
      </div>
    )
  }
}

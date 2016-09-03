class FeatureSubmission extends React.Component {
  constructor() {
    super();
    this.state = {
      showSubmissionForm: false
    }
    this.toggleFormView = this.toggleFormView.bind(this);
    this.submitFeature = this.submitFeature.bind(this);
  }

  toggleFormView() {
    this.setState({
      showSubmissionForm: !this.state.showSubmissionForm
    })
  }

  submitFeature(e) {
    e.preventDefault();
    let descriptionField = this.refs.trackDescription;
    let talentField = this.refs.trackTalent;
    let fileField = this.refs.trackFile;
    let data = {
      description: descriptionField.value,
      talent_id: talentField.value,
      file: fileField.value,
      user_id: this.refs.trackUser.value,
      song_id: this.props.song.id
    }
    fetch(`/feature_tracks`, {
      method: "post",
      dataType: "JSON",
      headers: {
          "X-CSRF-Token": this.props.csrf,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
      credentials: "include",
      body: JSON.stringify(data)
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
        { this.state.showSubmissionForm ?
            <div className="form-holder">
              <h3>Upload a Feature Track</h3>
              <form encType="multipart/form-data" onSubmit={this.submitFeature}>
                <input type="hidden" name="feature_track[user_id]" ref="trackUser" value={this.props.currentUser.id} />
                <label htmlFor="feature_track[description]" className="form-label">Track Description:</label>
                <textarea rows="5" cols="30" name="feature_track[description]" ref="trackDescription"></textarea>
                <label htmlFor="feature_track[talent_id]" className="form-label">What talent does this track correspond with?</label>
                <select ref="trackTalent">
                  {this.props.desiredTalents.map((talent, i) => {
                    return <option value={talent.id} key={i}>{talent.title}</option>
                  })}
                </select>
                <input type="file" name="feature_track[file]" className="form-input" ref="trackFile"/>
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
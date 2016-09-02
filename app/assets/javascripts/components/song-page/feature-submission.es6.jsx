class FeatureSubmission extends React.Component {
  constructor() {
    super();
    this.state = {
      showSubmissionForm: false
    }
    this.toggleFormView = this.toggleFormView.bind(this);
  }

  toggleFormView() {
    this.setState({
      showSubmissionForm: !this.state.showSubmissionForm
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
            <form>
              <p>Insert form here</p>
            </form>
          :
            null
        }
      </div>
    )
  }
}
class UserProjects extends React.Component{
  render(){
    let finished = this.props.finished
    let unfinished = this.props.unfinished
    return (
      <div id="UserProjects" className="tabcontent">
        < UserFinishedSongs finished={this.props.finished} />
        <br/>
        < UserUnfinishedSongs unfinished={this.props.unfinished} />
      </div>
      )
}}
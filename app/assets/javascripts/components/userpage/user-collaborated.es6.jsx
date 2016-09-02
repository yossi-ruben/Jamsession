class UserCollaborated extends React.Component {
  render() {
    return (
      <div id="Collaborated" className="tabcontent">
        <h3>Finished</h3>
          < UserSongs />
        <br/>
        <h3>Unfinished</h3>
          < UserSongs />
      </div>
      );
  }
}
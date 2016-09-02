class UserProjects extends React.Component{
  render(){
    return (

      <div id="List-of-projects" className="tabcontent">
        <div className="song">
          <h3>Finished</h3>
            < UserSongs />
        </div>
        <br/>
        <div className="song">
          <h3>Unfinished</h3>
            < UserSongs />
        </div>
      </div>

      );
}}
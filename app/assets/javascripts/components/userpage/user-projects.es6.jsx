class UserProjects extends React.Component{
  render(){
    return (

      <div id="List-of-projects" className="tabcontent">
        <h3>Finished</h3>
          < UserSongs />
        <br/>
        <h3>Unfinished</h3>
          < UserSongs />
      </div>

      );
}}
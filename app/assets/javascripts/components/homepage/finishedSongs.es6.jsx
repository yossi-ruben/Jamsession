class FinishedSongs extends React.Component{

  constructor(){
    super()
    this.state = {
      data: [],
      genres: []
    }
  }



componentDidMount(){
  fetch('/finished_songs')
  .then((response) => response.json())
  .then((json) => {
    this.setState({data: json})
  });

}




  render(){

    return(
      <div className="FinishedSongs">
        <div className="Title"> Finished </div>

        <div className="UnFinNav">
          <ul>
            <li>Genres</li>
            <li>Hot</li>
            <li>Recently Finished</li>
            <li>Random</li>
            <li>Recommended</li>
          </ul>
        </div>


        {this.state.data.map((song, i) =>{
          return <Song theSong={song} key={i} />
        })}




      </div>


    )



  }













}

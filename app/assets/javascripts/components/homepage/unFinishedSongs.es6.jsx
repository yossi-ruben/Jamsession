class UnFinishedSongs extends React.Component{

  constructor(){
    super()
    this.state = {
      data: []
    }

  }


componentDidMount(){
  fetch('/unfinished_songs')
  .then((response) => response.json())
  .then((json) => {
    this.setState({data: json})
  });
}






  render(){
    return(
      <div className="UnfinishedSongs">
        <div className="Title"> Unfinished </div>

        <div className="UnFinNav">
          <ul>
            <li>Talents</li>
            <li>Genres</li>
            <li>Hot</li>
            <li>New</li>
            <li>For Me</li>
          </ul>
        </div>



      </div>
    )
  }



}

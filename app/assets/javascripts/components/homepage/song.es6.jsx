class Song extends React.Component{

  constructor(){
    super()
    this.state = {
      data: []
    }
  }


  render(){
    return (
        <div className="Song">
          <h3>Song Title</h3>
          <p>Info about Song</p>
          <div className="artistDiv">
            <p>Artist Name</p>
          </div>
        </div>
      )


  }


}

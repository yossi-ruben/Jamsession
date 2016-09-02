class UserSongs extends React.Component {
  render(){
    return(
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
        </ol>

        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <img src="img_chania.jpg" alt="Chania" />
            <div className="carousel-caption">
              <h4>Song Title</h4>
              <h5>Date</h5>
              <p>Description</p>
            </div>
          </div>
        </div>
        
        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
  );
}}
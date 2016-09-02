class UserSongs extends React.Component {
  render(){
    return(
      <div id="myCarousel" className="carousel slide" data-ride="carousel">


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
        

      </div>
  );
}}
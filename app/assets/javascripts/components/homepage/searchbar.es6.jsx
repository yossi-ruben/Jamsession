class SearchBar extends React.Component{

  constructor(){
    super()
  }

  componentDidMount(){
    fetch('/all_users')
    .then((response) => response.json())
    .then((json) => {

      $("#search_area").autocomplete({
        source: json,
        change: function( event, ui){
        }
      })

    })


  }

  render(){
    return(
      <div id="search-form">
        <form action="/users" method="GET">
          <input id="search_area" type="text" name="search" placeholder="Search For Users" />
          <input type="submit" value="Search" id="search_button" className="btn btn-success"/>
        </form>
      </div>
    )

  }







}

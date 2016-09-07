class ErrorDisplay extends React.Component {
  render() {
    return (
      <ul>
        {this.props.errors.map((error, i) => {
          <li key={i}>{error}</li>
        })}
      </ul>
    )
  }
}
class ErrorDisplay extends React.Component {
  render() {
    return (
      <ul>
        {this.props.errors.map((error, i) => {
          return <li key={i} className="error-text">{error}</li>
        })}
      </ul>
    )
  }
}
class PrivateSongView extends React.Component {
  constructor() {
    super()
    this.state = {
      talentArray: []
    }
    this.findAllTalents = this.findAllTalents.bind(this);
  }

  componentDidMount() {
    this.findAllTalents();
  }

  findAllTalents() {
    var featureTalentArray = []
    this.props.featureTracks.map((feature) => {
      featureTalentArray.push(feature.talent.title)
    })
    var uniqueTalentArray = featureTalentArray.filter((talent, index, self) => {
      return self.indexOf(talent) === index;
    })
    this.setState({
      talentArray: uniqueTalentArray
    })
  }

   // Need to write a way to filter out all features included in the most recent master

  // Need to write a method to play all selected audio players
  render() {
    let featureTracks = this.props.featureTracks
    return (
      <div>
        <h1>Masters</h1>
        <h1>Features Included in Most Recent Master</h1>
        <h1>All Features by Talent</h1>
        {this.state.talentArray.map((talent, i) => {
          let featuresWithTalent = featureTracks.filter((feature) => {
              return feature.talent.title === talent
            })
          return (
          <div key={i}>
            <h3>{talent}</h3>
            {featuresWithTalent.map((feature, i) => {
              return < FeatureTrack
                       featureTrack={feature}
                       featureContributor={feature.user}
                       key={i} />
            })}
          </div>
          )
        })}
      </div>
    )
  }
}
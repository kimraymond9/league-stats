import React from 'react';
import logo from '../logo.png';
import { connect } from 'react-redux';
import champion from '../champion.js';
import Select, { components } from 'react-select';
import Button from '@material-ui/core/Button';
import '../App.css'
import CircularProgress from '@material-ui/core/CircularProgress';

const IconOption = (props) => (
  <components.Option {...props}>
    <img src={props.data.icon} height="32" width="32" />
    {' '}{props.data.label}
  </components.Option>
);

const options = champion.map(option => ({
  value: option.id,
  label: option.name,
  icon: option.icon,
}))


class Input extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      champion: champion,
      selectedOption: null,
      loading: false,
    }; 
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  handleGetMatches = (event) => {
    event.preventDefault();
    if (this.state.selectedOption !== null){
      this.setState({loading: true})
      this.props.dispatch(this.props.getDataForSummonerNameAndChampionId(this.state.username, this.state.selectedOption.value));
    }
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter' && this.state.selectedOption !== null){
      this.props.dispatch(this.props.getDataForSummonerNameAndChampionId(this.state.username, this.state.selectedOption.value));
    }
  }

  handleUsernameChanged = (event) => {
    event.preventDefault();
    this.setState({username: event.target.value});
  }




  render() {
    const { selectedOption } = this.state;

    return ( 
      <div className="input">
        <div className="App w3-row">
          <div className="w3-display-container w3-content w3-wide">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
          </div>
        </div>
        <div className="component">
            <input
              className="Username"
              placeholder="Username"
              maxLength="16"
              onChange={
                this.handleUsernameChanged
              }
            />
        </div>
        <div className="component">
            <Select
              className="options"
              placeholder="Champion"
              components={{ Option: IconOption }}
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
        </div>
        <div className="component">
            <Button
              className="submit"
              variant="contained"
              color="primary"
              onClick = {
                this.handleGetMatches
              }> Get Matches 
              </Button>
        </div>
        <div className="errorMessage">
        </div>
        <div className="loading">
          {!!this.props.summoner.accountId && !Object.keys(this.props.userTimelineData).length ? <CircularProgress /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userTimelineData: state.userTimelineData,
    summoner: state.summoner,
  }
};

export default connect(mapStateToProps)(Input);

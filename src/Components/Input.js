import React from 'react';
import { connect } from 'react-redux';
import champion from '../champion.js';
import Select from 'react-select';
import Button from '@material-ui/core/Button';
import '../App.css'
import CircularProgress from '@material-ui/core/CircularProgress';

const options = champion.map(option => ({
  value: option.id,
  label: option.name,
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
        {this.props.summoner.message}
        </div>
        <div className="loading">
          {this.state.loading ? <CircularProgress /> : null}
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

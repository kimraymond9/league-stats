import React from 'react';
import logo from '../logo.png';
import { connect } from 'react-redux';
import champion from '../champion.js';
import Select, { components } from 'react-select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import '../App.css'
import CircularProgress from '@material-ui/core/CircularProgress';

const IconOption = (props) => (
  <components.Option {...props}>
    <img className="icons" src={props.data.icon} alt="" />
    {' '}{props.data.label}
  </components.Option>
);

const options = champion.map(option => ({
  value: option.id,
  label: option.name,
  icon: option.icon,
}))

const currencies = [
  {
    value: 'OC1',
    label: 'OCE',
  },
  {
    value: 'NA',
    label: 'NA',
  },
  {
    value: 'EUN1',
    label: 'EUNE',
  },
  {
    value: 'EUW1',
    label: 'EUW',
  },
  {
    value: 'KR',
    label: 'KR',
  },
  {
    value: 'JP1',
    label: 'JP',
  },
  {
    value: 'BR1',
    label: 'BR',
  },
  {
    value: 'LA1',
    label: 'LAN',
  },
  {
    value: 'LA2',
    label: 'LAS',
  }
];


class UserInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      champion: champion,
      selectedOption: null,
      region: 'EUR',
    }; 
  }


  handleRegion = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  handleGetMatches = (event) => {
    event.preventDefault();
    if (this.state.selectedOption !== null){
      this.setState({loading: true})
      this.props.dispatch(this.props.getDataForSummonerNameAndChampionId(this.state.username, this.state.selectedOption.value, this.state.region));
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
        <div className="component App w3-row">
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
              className="champion-selector"
              placeholder="Champion"
              components={{ Option: IconOption }}
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
        </div>
        <div className="component">
          <TextField
            className="region-selector"
            select
            label="Region"
            value={this.state.region}
            onChange={this.handleRegion('region')}
            margin="normal"
            variant="outlined"
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
              {this.props.status.errorMessage}
        </div>
        <div className="loading">
          {this.props.status.loading ? <CircularProgress /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userTimelineData: state.userTimelineData,
    status: state.status,
  }
};

export default connect(mapStateToProps)(UserInput);

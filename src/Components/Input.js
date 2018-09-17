import React from 'react';
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
    this.props.dispatch(this.props.getDataForSummonerNameAndChampionId(this.state.username, this.state.selectedOption.value));
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
              onKeyDown={this.handleKeyPress}
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
        <div className="loading">
          <CircularProgress />
        </div>
      </div>

    );
  }
}

export default Input;

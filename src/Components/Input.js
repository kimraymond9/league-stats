import React from 'react';
import champion from '../champion.js';
import Select from 'react-select';
import Button from '@material-ui/core/Button';


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
    }; 
  }



  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  handleGetMatches = (event) => {
    event.preventDefault();
    this.props.dispatch(this.props.getDataForSummonerNameAndChampionId(this.state.username, this.state.selectedOption.value));
  }

  handleUsernameChanged = (event) => {
    event.preventDefault();
    this.setState({username: event.target.value});
  }

  render() {
    const { selectedOption } = this.state;

    return (
        <div className = "input">
            <input
              className="Username"
              placeholder="Username"
              onChange={
                this.handleUsernameChanged
              }
            />
            <Select
              className="options"
              placeholder="Champion"
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
            <Button 
            variant="contained"
            color="secondary"
            onClick = {
              this.handleGetMatches
            }> Get Matches 
            </Button>
        </div>
    );
  }
}

export default Input;

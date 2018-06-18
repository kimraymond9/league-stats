import React from 'react';
import champion from '../champion.js';

class Input extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      championId: "",
      champion: champion,
    };
  }

  componentWillMount(){

  }
  
  handleGetMatches = (event) => {
    this.props.dispatch(this.props.getDataForSummonerNameAndChampionId(this.state.username, this.state.championId));
  }

  handleUsernameChanged = (event) => {
    this.setState({username: event.target.value});
  }

  handleChampionChanged = (event) => {
    this.setState({championId: event.target.value});
  }

  render() {
    return (
      <div>
        
        <label>Username</label>
        <input type="text" name="Username" onChange={this.handleUsernameChanged}/>

        <label>Champion</label>
        <select name="Champion" onChange={this.handleChampionChanged}>
          {this.state.champion.map((option, index) =>
            <option key={index} value={option.id}>
              {option.name}
            </option>
          )}
        </select>   
        <button onClick={this.handleGetMatches}>Get Matches!</button>   
      </div>
    );
  }
}

export default Input;

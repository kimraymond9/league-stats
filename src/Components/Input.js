import React from 'react';

class Input extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      championId: ""
    };
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
          <option />
          <option value="412">Thresh</option>
          <option value="420">Illaoi</option>
          <option value="24">Jax</option>
          <option value="9">Fiddle</option>
        </select>   
        <button onClick={this.handleGetMatches}>Get Matches!</button>   
      </div>
    );
  }
}

export default Input;

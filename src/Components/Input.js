import React from 'react';
import { connect } from 'react-redux';
import { getIDAndMatches } from '../actions.js';

class Input extends React.Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(getIDAndMatches(event.target.Username.value, event.target.Champion.value));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>UserName</label>
        <input type="text" name="Username" defaultValue="never bard"/>

        <label>Champion</label>
        <select name="Champion">
          <option value="412">Thresh</option>
          <option value="420">Illaoi</option>
          <option value="24">Jax</option>
          <option value="9">Fiddle</option>
        </select>   
        <button type="submit">Submit</button>   
      </form>
    );
  }
  
}

const mapStateToProps = ({ Input }) => ({
  Input,
});
// const mapStateToProps = (state) => ({ text: state.text });

export default connect(mapStateToProps)(Input);

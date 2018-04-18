import React from 'react';
import { connect } from 'react-redux';
import { getID } from '../actions.js';

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.dispatch({ type: 'TEXT_CHANGE', text: event.target.value });
  }



  render() {
    return (
      <form onChange={this.handleChange}>
        <label>
          name
          <input
            type="text"
            ref={(element) => this.inputField = element}
            onChange={this.handleChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                if (this.inputField.value === '') {
                  alert('empty');
                  event.preventDefault();
                  return;
                }
                this.props.dispatch(getID(this.inputField.value));
                event.preventDefault();
              }
            }}
          />
        </label>
      </form>
    );
  }
}

const mapStateToProps = ({ Input }) => ({
  Input,
});
// const mapStateToProps = (state) => ({ text: state.text });

export default connect(mapStateToProps)(Input);

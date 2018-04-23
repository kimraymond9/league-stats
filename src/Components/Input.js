import React from 'react';
import { connect } from 'react-redux';
import { getIDAndMatches } from '../actions.js';

class Input extends React.Component {
  constructor(props) {
    super(props);

  }





  render() {
    return (
      <form>
        <label>
          name
          <input
            type="text"
            ref={(element) => this.inputField = element}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                if (this.inputField.value === '') {
                  alert('empty');
                  event.preventDefault();
                  return;
                }
                this.props.dispatch(getIDAndMatches(this.inputField.value));
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

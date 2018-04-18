import React from 'react';
import { connect } from 'react-redux';
import { getMatches } from '../actions.js';

class Info extends React.Component {

  constructor(props) {
    super(props);


  }


  render() {
    return (
            <div>
      <p>
        Username: {this.props.input}
      </p>
      this.props.dispatch(getMatches(this.props.input));
      </div>
    );
  }
}


const mapStateToProps = ({ input }) => ({ input });
// const mapStateToProps = (state) => ({ counter: state.counter });

export default connect(mapStateToProps)(Info);

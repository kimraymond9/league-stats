import React from 'react';
import { connect } from 'react-redux';
import { getData } from '../actions.js';

class Info extends React.Component {

  constructor(props) {
    super(props);


  }

  componentWillMount() {
    this.props.dispatch(getData(this.props.input));
  }

  render() {
    return (
      <p>
        Username: {this.props.input}
      </p>
    );
  }
}


const mapStateToProps = ({ input }) => ({ input });
// const mapStateToProps = (state) => ({ counter: state.counter });

export default connect(mapStateToProps)(Info);

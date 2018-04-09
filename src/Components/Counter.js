import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {
  render() {
    return (
      <p>
        Counter: {this.props.counter} times.
      </p>
    );
  }
}


const mapStateToProps = ({ counter }) => ({ counter });
// const mapStateToProps = (state) => ({ counter: state.counter });

export default connect(mapStateToProps)(Counter);

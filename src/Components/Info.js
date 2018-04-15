import React from 'react';
import { connect } from 'react-redux';

class Info extends React.Component {

  constructor(props) {
    super(props);


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

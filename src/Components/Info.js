import React from 'react';
import { connect } from 'react-redux';

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
      </div>
    );
  }
}


const mapStateToProps = ({ input }) => ({ input });
// const mapStateToProps = (state) => ({ counter: state.counter });

export default connect(mapStateToProps)(Info);

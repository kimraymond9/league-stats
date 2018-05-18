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
          Username: {this.props.match[0].gameId}
      </p>
      </div>
    );
  }
}


const mapStateToProps = ({ match }) => ({ match });
// const mapStateToProps = (state) => ({ counter: state.counter });

export default connect(mapStateToProps)(Info);

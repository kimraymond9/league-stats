import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../actions.js';


class Info extends React.Component {

  render() {
    const match = this.props.match;
    const input = this.props.input;
    if(match.length < 5){
      return null;
    }
    var i;
    for(i = 0; i < match.length; i ++){
      this.props.dispatch(getUserData(match[i], input));
    }
      return (
        <div>
          <p>Game ID: {this.props.match[0].gameId}</p>
          <p>Game ID: {this.props.match[1].gameId}</p>
          <p>Game ID: {this.props.match[2].gameId}</p>
          <p>Game ID: {this.props.match[3].gameId}</p>
          <p>Game ID: {this.props.match[4].gameId}</p>
        </div>
      );
  }
}

 const mapStateToProps = ({ match, input }) => ({ match, input });

export default connect(mapStateToProps)(Info);

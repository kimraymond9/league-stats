import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../actions.js';


class Info extends React.Component {

  render() {
    if (this.props.match.length < 5) {
      return null;
    }
    if (this.props.info.length < 5) {
      return null;
    }
    

    return (
      <div>
        <p>Score: {this.props.info[0].stats.kills}/{this.props.info[0].stats.deaths}/{this.props.info[0].stats.assists}</p>
        <p>Score: {this.props.info[1].stats.kills}/{this.props.info[1].stats.deaths}/{this.props.info[1].stats.assists}</p>
        <p>Score: {this.props.info[2].stats.kills}/{this.props.info[2].stats.deaths}/{this.props.info[2].stats.assists}</p>
        <p>Score: {this.props.info[3].stats.kills}/{this.props.info[3].stats.deaths}/{this.props.info[3].stats.assists}</p>
        <p>Score: {this.props.info[4].stats.kills}/{this.props.info[4].stats.deaths}/{this.props.info[4].stats.assists}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ match, info }) => ({ match, info });

export default connect(mapStateToProps)(Info);

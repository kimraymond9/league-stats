import React from 'react';
import { connect } from 'react-redux';

class Info extends React.Component {
  render() {
    if (!this.props.userData) {
      return null;
    }
    return (
      <div>
        {
          this.props.userData.map((currentUserData, i) =>
            <p key={i}>Score: {currentUserData.stats.kills}/{currentUserData.stats.deaths}/{currentUserData.stats.assists}</p>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    matchList: state.matchList
  }
};

export default connect(mapStateToProps)(Info);

import React from 'react';
import { connect } from 'react-redux';

class Info extends React.Component {
  render() {

    return (
      <div>
        <div class="col-2">
          <p>Games: {this.props.userData.numberOfGames}</p>
          <p>Wins: {this.props.userData.numberOfWins}</p>
          <p>Losses: {this.props.userData.numberOfLosses}</p>
          <p>Winrate: {this.props.userData.winrate}%</p>
          <p>Average Kills: {this.props.userData.averageKills}</p>
          <p>Average Deaths: {this.props.userData.averageDeaths}</p>
          <p>Average Assists: {this.props.userData.averageAssists}</p>
        </div>
        <div class="col-3">
          <p>Average Minions Per Minute: {this.props.userData.averageMinionsPerMinute} CSPM</p>
          <p>Average Vision Wards Bought: {this.props.userData.averageVisionWardsBought}</p>   
          <p>Average Wards Placed: {this.props.userData.averageWardsPlaced}</p>
          <p>Average Wards Killed: {this.props.userData.averageWardsKilled}</p>
          <p>Average Vision Score: {this.props.userData.averageVisionScore}</p>
          <p>Average Damage Dealt To Towers: {this.props.userData.averageDamageDealtToTurrets}</p>
          <p>Average Damage Dealt To Objectives: {this.props.userData.averageDamageDealtToObjectives}</p>
          <p>Average Total Damage Dealt To Champions: {this.props.userData.averageTotalDamageDealtToChampions}</p>
          <p>Average Physical Damage To Champions: {this.props.userData.averagePhysicalDamageDealtToChampions}</p>
          <p>Average Magic Damage To Champions: {this.props.userData.averageMagicDamageDealtToChampions}</p>
          <p>Average True Damage To Champions: {this.props.userData.averageTrueDamageDealtToChampions}</p>
          <p>Average Damage To Champions Per Minute: {this.props.userData.averageDamageDealtToChampionsPerMinute} DPM</p>
          <p>Average Gold Earned Per Minute: {this.props.userData.averageGoldPerMinute} GPM</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData
  }
};

export default connect(mapStateToProps)(Info);

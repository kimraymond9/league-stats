import React from 'react';
import { connect } from 'react-redux';
import { getData } from '../actions.js';

class Info extends React.Component {

  constructor(props) {
    super(props);

    this.apiKey = '?api_key=RGAPI-635da96c-77d7-4124-94e7-22255d9f4563';

    this.baseURL = 'https://oc1.api.riotgames.com/lol/summoner/v3/summoners/by-name/';

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

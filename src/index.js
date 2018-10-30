import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getDataForSummonerNameAndChampionId } from './action-creators';
import UserInput from './Components/UserInput';
import Graph from './Components/Graph';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './combined-reducers';

const store = configureStore();

ReactDOM.render(<Provider store={store}>
  <div className="application">
    <div className="w3-row">
      <div className="w3-col side w3-container"></div>
      <div className="w3-col firstColumn w3-container">
        <UserInput dispatch={store.dispatch} getDataForSummonerNameAndChampionId={getDataForSummonerNameAndChampionId}/>
      </div>
      <div className="w3-col secondColumn w3-container">
        <Graph />
      </div>
    </div>
  </div>
</Provider>, document.getElementById('root'));

registerServiceWorker();

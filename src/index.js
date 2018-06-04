import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';

import { getDataForSummonerNameAndChampionId } from './action-creators';
import App from './Components/App';
import Input from './Components/Input';
import Info from './Components/Info';
import registerServiceWorker from './registerServiceWorker';

import { configureStore } from './combined-reducers';

const store = configureStore();

ReactDOM.render(<Provider store={store}>
  <div>
    <App />
    <Input dispatch={store.dispatch} getDataForSummonerNameAndChampionId={getDataForSummonerNameAndChampionId}/>
    <Info />
  </div>
</Provider>, document.getElementById('root'));

registerServiceWorker();

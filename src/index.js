import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';

import Button from './Components/Button';
import App from './Components/App';
import Input from './Components/Input';
import Info from './Components/Info';
import Counter from './Components/Counter';
import registerServiceWorker from './registerServiceWorker';

import { configureStore } from './combined-reducers';

const store = configureStore();

ReactDOM.render(
<Provider store={store}>
  <div>
    <App />
    <Button />
    <Counter />
    <Input />
    <Info />
    </div>
</Provider>
    ,
     document.getElementById('root'));

registerServiceWorker();

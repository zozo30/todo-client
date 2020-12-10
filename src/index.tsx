import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './redux/stores'
import { Provider } from 'react-redux'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode >,
  document.getElementById('root')
);
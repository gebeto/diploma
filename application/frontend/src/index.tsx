import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { SocketIOProvider } from 'use-socketio';

import './index.scss';
import reportWebVitals from './reportWebVitals';

import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { store } from './store/';
import { Auth } from './components/Auth/';


ReactDOM.render(
  (
    <React.StrictMode>
      <Provider store={store}>
        <Auth>
          <SocketIOProvider url="/">
            <HashRouter>
              <App />
            </HashRouter>
          </SocketIOProvider>
        </Auth>
      </Provider>
    </React.StrictMode>
  ),
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

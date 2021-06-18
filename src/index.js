import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import {Main} from './layout'
import {Home} from './pages/HomePage/Home'
import AppRoute from './Route/App.route';
import "normalize.css";
import './asset/styles/global.scss';

ReactDOM.render(
  <AppRoute />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

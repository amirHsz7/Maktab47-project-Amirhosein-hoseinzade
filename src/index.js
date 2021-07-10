import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRoute from './Route/App.route';
import "normalize.css";
import './asset/styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import reducers from './redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from "redux-logger";

const middleware = [];
if(process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}


const store = createStore(reducers , composeWithDevTools(applyMiddleware(...middleware)));

ReactDOM.render(
    <Provider store={store}>
        <AppRoute />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

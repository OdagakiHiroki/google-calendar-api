import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

import { gapiInit } from "utils";

const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
].join(" ");

const initParams = {
  apiKey: process.env.REACT_APP_GOOGLE_AUTH_API_KEY,
  clientId: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
  discoveryDocs: DISCOVERY_DOCS,
  scope: SCOPES,
}

const reactSetup = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

gapiInit(
  initParams,
  reactSetup
)
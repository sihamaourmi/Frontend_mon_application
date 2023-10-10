import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.css';
//pour le loginV1 
import'./images/icons/favicon.ico';
import'./vendor/bootstrap/css/bootstrap.min.css';
import'./fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import'./vendor/animate/animate.css';
import'./vendor/css-hamburgers/hamburgers.min.css';
import'./vendor/select2/select2.min.css';
import'./css/util.css';
import'./css/main.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

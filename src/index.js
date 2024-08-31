import React from 'react';
import ReactDOM from 'react-dom/client';
import './custom.scss';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/dropdown';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {LoadingProvider} from "./LoadingContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <GoogleOAuthProvider clientId="920431881334-3imcpflrme2b2b6j76h6ipnucnnfj1kk.apps.googleusercontent.com">
        <React.StrictMode>
            <BrowserRouter>
                <LoadingProvider>
                    <App />
                </LoadingProvider>
            </BrowserRouter>
        </React.StrictMode>
    </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

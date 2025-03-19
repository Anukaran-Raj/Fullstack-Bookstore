import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./store/store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
</React.StrictMode>
 
);

{/* <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode> */}
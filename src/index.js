import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Form,
} from "./components";



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navigation />
      <Routes>
        {/* Routes with navbar can go in App */}
        <Route path="/" element={<Home />} />
        <Route path="/Form" element={<Form />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

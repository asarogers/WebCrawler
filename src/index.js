import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import InsertCustomItem from './pages/InsertCustomItem.js';
import SendEmail from './components/SendEmail';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element = {<App />} />
            <Route path="/insert" element = {<InsertCustomItem />} />
            <Route path="/email" element = {<SendEmail />} />
        </Routes>


    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


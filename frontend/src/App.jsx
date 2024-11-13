//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ReviewCard from './components/ReviewCard';
import CreateAccount from './components/createAccount';


function App() {
  return (
    <div>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<ReviewCard />} />
          <Route path="/ReviewCard" element={<ReviewCard />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App

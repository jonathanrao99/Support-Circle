import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import NewPage from './components/Addiction';
import Drug from './components/Drug';
import Video from './components/Confirmation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Addiction" element={<NewPage />} />
          <Route path="/Drug" element={<Drug />} />
          <Route path="/Confirmation" element={<Video />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


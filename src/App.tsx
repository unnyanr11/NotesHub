import React from 'react';
import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';

function App() {
  return (
    <HashRouter>
        <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />

      </Routes>
    </HashRouter>
  );
}

export default App;
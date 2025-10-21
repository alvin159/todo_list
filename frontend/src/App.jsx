import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Todo, Settings, Info } from './components';
import axios from 'axios';

function App() {
  const [background, setBackground] = useState('#ffffff');
  const API = process.env.REACT_APP_API_URL || 'http://localhost:3010';

  useEffect(() => {
    axios.get(`${API}/color`)
      .then(res => setBackground(res.data.backgroundColor))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ backgroundColor: background, minHeight: '100vh', transition: 'background-color 0.3s' }}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/settings" element={<Settings setBackground={setBackground} />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

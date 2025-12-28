// Jaan John

import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Header />
      <div className="container">
        <Sidebar />
        <MainContent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="version">5.0.0</div>
    </>
  );
}

export default App;
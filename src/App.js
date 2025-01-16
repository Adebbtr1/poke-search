import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home'; 
import PokemonDetail from './PokemonDetails'; 


const App = () => {
  return (
    <Routes>
      {}
      <Route path="/" element={<Home />} />

      {}
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
    </Routes>
  );
};

export default App;



import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login  from './pages/Login';
import Signup from './pages/Signup';
import Coach  from './pages/Coach';

import './App.css';
import Players from './pages/Players';
import Coaches from './pages/Coaches';
import Profile from './pages/Profile';
import Player from './pages/Player';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/"          element={<Login/>} />
          <Route path="/signup"    element={<Signup />} />
          <Route path="/player"    element={<Player />} />
          <Route path="/coach"     element={<Coach />} />
          <Route path="/players"   element={<Players />} />
          <Route path="/favorites" element={<Players favorites />} />
          <Route path="/coaches"   element={<Coaches />} />
          <Route path="/profile"   element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
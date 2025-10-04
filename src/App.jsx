import { useState } from 'react';
import MemoryGame from './components/MemoryGame';
import './App.css';
import './styles/game.css';

function App() {
  return (
    <>
      <header>
        <h1>Memory Game</h1>
        <p>A React assignment for The Odin Project.</p>
      </header>
      <main>
        <MemoryGame></MemoryGame>
      </main>
    </>
  )
}

export default App

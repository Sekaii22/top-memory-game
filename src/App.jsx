import { useState } from 'react';
import MemoryGame from './components/MemoryGame';
import './App.css';
import './styles/game.css';

const difficulty = {
  easy: 12,
  medium: 18,
  hard: 24
}

function App() {
  const [diffLevel, setDiffLevel] = useState("easy");
  const [bestScore, setBestScore] = useState(0);

  function handleGameOver(score) {
    if (score > bestScore)
      setBestScore(score);
  }

  return (
    <>
      <header>
        <h1>Pokémon Memory Game</h1>
        <p>A React assignment for The Odin Project.</p>
      </header>
      <main>
        <div>
          <select value={diffLevel} onChange={(e) => setDiffLevel(e.target.value)}>
            {
              Object.keys(difficulty).map(key => (
                <option key={key} value={key}>
                  {key[0].toUpperCase() + key.slice(1) + " (" + difficulty[key] + ")"}
                </option>        
              ))
            }
          </select>
          <span className="best-score">Best score: {bestScore}</span>
        </div>
        
        <MemoryGame 
          key={diffLevel} 
          size={difficulty[diffLevel]}
          onGameOver={handleGameOver}
        >
        </MemoryGame>
      </main>
    </>
  )
}

export default App

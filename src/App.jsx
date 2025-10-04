import MemoryGame from './components/MemoryGame';
import './App.css';
import './styles/game.css';

function App() {
  return (
    <>
      <header>
        <h1>Pokémon Memory Game</h1>
        <p>A React assignment for The Odin Project.</p>
      </header>
      <main>
        <MemoryGame size={24}></MemoryGame>
      </main>
    </>
  )
}

export default App

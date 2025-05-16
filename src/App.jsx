import { useState } from 'react';
import './App.css';
import { Home } from './Components/Home.jsx';
import { Game } from './Components/Game.jsx';
import { GameOver } from './Components/GameOver.jsx';
import GameOverLoader from './Components/LoaderGameOver';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  // Garder seulement les états globaux nécessaires
  const [finalScore, setFinalScore] = useState(null);
  const [isLoadingGameOver, setIsLoadingGameOver] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={
          <Game 
            setFinalScore={setFinalScore}
            setIsLoadingGameOver={setIsLoadingGameOver}
          />
        } />
        <Route path="/game-over-loading" element={
          <GameOverLoader onLoadingComplete={() => {
            setIsLoadingGameOver(false);
            // La navigation est maintenant gérée dans le composant
          }} />
        } />
        <Route path="/game-over" element={
          <GameOver 
            finalScore={finalScore}
            setFinalScore={setFinalScore}
          />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

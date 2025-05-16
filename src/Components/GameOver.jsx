import { useState, useEffect } from "react";
import SkullIcon from "../assets/icons/skull.svg";
import styled from 'styled-components';
import { Link } from "react-router-dom";

export function GameOver({ finalScore }) {
    const [playerName, setPlayerName] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [highScores, setHighScores] = useState([]);

    // Charger les scores existants au chargement
    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem("highScores") || "[]");
        setHighScores(savedScores);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Formater le temps pour l'affichage
        const formattedScore = formatTime(finalScore);

        // Ajouter le nouveau score
        const newScore = {
            name: playerName,
            score: finalScore,
            formattedScore: formattedScore,
            date: new Date().toLocaleDateString()
        };

        // Mettre à jour les scores
        const updatedScores = [...highScores, newScore];
        // Trier les scores - plus grand temps = meilleur score
        updatedScores.sort((a, b) => b.score - a.score);

        // Limiter à 10 meilleurs scores
        const topScores = updatedScores.slice(0, 100);

        // Sauvegarder dans localStorage
        localStorage.setItem("highScores", JSON.stringify(topScores));

        // Mettre à jour l'état
        setHighScores(topScores);
        setIsSubmitted(true);
    };

    // Fonction pour formater le temps en minutes:secondes
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-[100%] relative p-8 gap-6">
            <div className="flex flex-col items-center justify-center gap-4">
                <img src={SkullIcon} alt="Skull Icon" className="w-[15vw] h-[15vw] drop-shadow-xl animate-pulse" />
                <h1 className="text-3xl font-bold text-[#0c0f0a] drop-shadow-xl">Game Over</h1>

                <p className="text-xl mt-2 text-[#0c0f0a]/75 mb-[1vw]">Vous avez survécu pendant : <span className="font-bold">{formatTime(finalScore)}</span></p>

                {/* Formulaire ou bouton rejouer */}
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center gap-4">
                        {/* Contenu du formulaire */}
                        <StyledWrapper>
                            <div className="brutalist-container">
                                <input
                                    id="playerName"
                                    placeholder="VOTRE NOM"
                                    className="brutalist-input smooth-type"
                                    type="text"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    required
                                />
                                <label className="brutalist-label">SCORE SURVIVOR</label>
                            </div>
                        </StyledWrapper>

                        <button
                            type="submit"
                            className="brutal-shadow p-[15px] bg-[#f6f6f6] hover:bg-[#f72585] text-black hover:text-white font-bold transition-colors cursor-pointer border-4 border-[#000] drop-shadow-xl mt-4"
                        >
                            Enregistrer mon score
                        </button>
                    </form>
                ) : (
                <div className="mt-6 flex flex-col items-center gap-4">
                    <p className="text-green-600 font-medium">Score enregistré avec succès !</p>
                    <div className="flex flex-row items-center gap-[2vw]">
                        <div className=" flex flex-col items-center gap-4">

                            <Link
                                to="/game"
                                className="hover:-rotate-5 hover:duration-300 duration-300 brutal-shadow p-[15px] bg-[#f6f6f6] hover:bg-[#f72585] text-black hover:text-white font-bold transition-colors cursor-pointer border-4 border-[#000] drop-shadow-xl mt-4 no-underline inline-block text-center"
                            >
                                Rejouer
                            </Link>
                        </div>

                        <div className=" flex flex-col items-center gap-4">
                            <Link
                                to="/"
                                className="hover:-rotate-5 hover:duration-300 duration-300 brutal-shadow p-[15px] bg-[#f6f6f6] hover:bg-[#f72585] text-black hover:text-white font-bold transition-colors cursor-pointer border-4 border-[#000] drop-shadow-xl mt-4 no-underline inline-block text-center"
                            >
                                Home
                            </Link>
                        </div>
                    </div>
                    </div>
                )}

                {/* Tableau des scores */}
                <div className="mt-8 w-full max-w-md">
                    <h2 className="text-xl text-[#0c0f0a] font-bold mb-3">Meilleurs scores</h2>

                    {highScores.length > 0 ? (
                        <div className="bg-gray-100 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 ">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rang
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Joueur
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Temps
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 ">
                                    {highScores.map((entry, index) => {
                                        let bgColor = "";
                                        if (index === 0) bgColor = "bg-[#ffc300]"; // Or
                                        else if (index === 1) bgColor = "bg-[#adb5bd]"; // Argent
                                        else if (index === 2) bgColor = "bg-[#c06722]"; // Bronze
                                        const highlight = playerName === entry.name && isSubmitted ? "border-l-8 border-green-500" : "";
                                        return (
                                            <tr key={index} className={`${bgColor} ${highlight}`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {entry.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {entry.formattedScore || formatTime(entry.score)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {entry.date}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">Aucun score enregistré pour le moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

const StyledWrapper = styled.div`
  .brutalist-container {
    position: relative;
    width: 250px;
    font-family: monospace;
  }

  .brutalist-input {
    width: 100%;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    background-color: #fff;
    border: 4px solid #000;
    position: relative;
    overflow: hidden;
    border-radius: 0;
    outline: none;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 5px 5px 0 #000, 10px 10px 0 #4a90e2;
  }

  @keyframes glitch {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }

  .brutalist-input:focus {
    animation: focus-pulse 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite,
      glitch 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
  }

  .brutalist-input:focus::after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: white;
    z-index: -1;
  }

  .brutalist-input:focus::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: -2;
    clip-path: inset(0 100% 0 0);
    animation: glitch-slice 4s steps(2, end) infinite;
  }

  @keyframes glitch-slice {
    0% {
      clip-path: inset(0 100% 0 0);
    }
    10% {
      clip-path: inset(0 5% 0 0);
    }
    20% {
      clip-path: inset(0 80% 0 0);
    }
    30% {
      clip-path: inset(0 10% 0 0);
    }
    40% {
      clip-path: inset(0 50% 0 0);
    }
    50% {
      clip-path: inset(0 30% 0 0);
    }
    60% {
      clip-path: inset(0 70% 0 0);
    }
    70% {
      clip-path: inset(0 15% 0 0);
    }
    80% {
      clip-path: inset(0 90% 0 0);
    }
    90% {
      clip-path: inset(0 5% 0 0);
    }
    100% {
      clip-path: inset(0 100% 0 0);
    }
  }

  .brutalist-label {
    position: absolute;
    left: -3px;
    top: -35px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    background-color: #000;
    padding: 5px 10px;
    transform: rotate(-1deg);
    z-index: 1;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .brutalist-input:focus + .brutalist-label {
    transform: rotate(0deg) scale(1.05);
    background-color: #4a90e2;
  }

  .smooth-type {
    position: relative;
    overflow: hidden;
  }

  .smooth-type::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .smooth-type:focus::before {
    opacity: 1;
    animation: type-gradient 2s linear infinite;
  }

  @keyframes type-gradient {
    0% {
      background-position: 300px 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  .brutalist-input::placeholder {
    color: #888;
    transition: color 0.3s ease;
  }

  .brutalist-input:focus::placeholder {
    color: transparent;
  }

  .brutalist-input:focus {
    animation: focus-pulse 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
  }

  @keyframes focus-pulse {
    0%,
    100% {
      border-color: #000;
    }
    50% {
      border-color: #4a90e2;
    }
  }
`;
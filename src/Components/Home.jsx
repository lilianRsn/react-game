import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ModalCredits } from './ModalCredits';
import HouseIcon from '../assets/icons/cabin.svg';

export function Home() {
    const [showCredits, setShowCredits] = useState(false);
    const [isHoveringPlay, setIsHoveringPlay] = useState(false);

    // Tableau de phrases
    const phrases = [
        "Construisez des maisons pour accueillir plus de survivants",
        "Chaque survivant consomme de la viande, gérez vos ressources avec soin",
        "Envoyez vos survivants chasser pour obtenir de la viande",
        "La récolte de bois est essentielle pour construire des abris",
        "Sans viande, vos survivants mourront de faim un par un",
        "Récoltez des pierres pour renforcer vos structures",
        "Survivre n'est pas une option, c'est un impératif",
        "Le temps est votre pire ennemi, agissez vite",
        "Équilibrez votre temps entre la chasse et la construction",
        "Plus vous avez de survivants, plus vous consommez de ressources"
    ];

    // Sélection aléatoire d'une phrase
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    const handleCloseCredits = () => setShowCredits(false);
    const handleOpenCredits = () => setShowCredits(true);

    // Gestionnaires d'événements pour le survol du bouton
    const handlePlayButtonHover = () => setIsHoveringPlay(true);
    const handlePlayButtonLeave = () => setIsHoveringPlay(false);

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen relative">
            <img
                src={HouseIcon}
                alt="Stone logo"
                className={`w-[7.5vw] h-[7.5vw] drop-shadow-xl transition-transform duration-800 
                            ${isHoveringPlay ? '-rotate-370 scale-110 duration-800' : ''}`}
            />
            <h1 className="text-3xl font-bold text-[#4a90e2] drop-shadow-xl">Survive React</h1>
            <p className="rotate-6 mt-[1vw] ml-[2vw] opacity-75 animate-bounce drop-shadow-xl text-[#4a90e2]/50">
                {randomPhrase}
            </p>
            <div className="btn-container flex flex-col items-center justify-center mt-8">
                <Link to="/game"
                    className="brutal-shadow p-[15px] text-black hover:text-white bg-[#f6f6f6] hover:bg-[#f72585] 
                            font-bold transition-colors  cursor-pointer border-4 border-[#000] 
                            drop-shadow-xl w-[10vw] mt-[2vw] no-underline text-center active:shadow-none active:!shadow-none active:brutal-shadow:none active:translate-y-2 active:translate-x-2"
                    onMouseEnter={handlePlayButtonHover}
                    onMouseLeave={handlePlayButtonLeave}
                >
                    Jouer
                </Link>
                <button
                    className="brutal-shadow p-[15px] text-black hover:text-white bg-[#f6f6f6] hover:bg-[#f72585] 
                            font-bold transition-colors cursor-pointer border-4 border-[#000] 
                            drop-shadow-xl w-[10vw] mt-[2vw] active:shadow-none active:!shadow-none active:brutal-shadow:none active:translate-y-2 active:translate-x-2"
                    onClick={handleOpenCredits}
                >
                    Credits
                </button>
            </div>

            {showCredits && (
                <ModalCredits handleCloseCredits={handleCloseCredits} />
            )}
        </div>
    );
}
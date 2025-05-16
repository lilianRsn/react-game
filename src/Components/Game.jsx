import TreeIcon from "../assets/icons/tree.svg";
import ArrowBack from "../assets/icons/arrow-back.svg";
import { NavBar } from './NavBar';
import { Quest } from './Quest';
import { useState, useEffect } from 'react';
import TreeLoader from './Tree-loader'
import TimeClock from './Loader-clock'
import { GameMap } from './Map';
import { Link, useNavigate } from "react-router-dom";

export function Game({ setFinalScore, setIsLoadingGameOver }) {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    // Etats pour les survivants et ressources  
    const [maxSurvivor, setMaxSurvivor] = useState(0);
    const [availableSurvivor, setAvailableSurvivor] = useState(0);
    const [meat, setMeat] = useState(8);
    const [wood, setWood] = useState(6);
    const [stone, setStone] = useState(0);

    // Timer pour compter le temps de jeu
    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (isTimerActive && !isLoading) {
                setTimer(prevTimer => prevTimer + 1);
            }
        }, 1000);
        return () => clearInterval(timerInterval);
    }, [isLoading, isTimerActive]);

    // Effet pour gérer le game over
    useEffect(() => {
        if (maxSurvivor > 0 && !isTimerActive) {
            setIsTimerActive(true);
        } else if (maxSurvivor <= 0 && isTimerActive) {
            setIsTimerActive(false);
            
            // Enregistrer le score final avant de naviguer
            setFinalScore(timer);
            setIsLoadingGameOver(true);
            
            // Naviguer vers l'écran de chargement game over
            navigate('/game-over-loading');
        }
    }, [maxSurvivor, isTimerActive, navigate, timer, setFinalScore, setIsLoadingGameOver]);



    // Fonction pour formater le timer en HH:MM:SS
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        // Ajouter un zéro devant si nécessaire
        const pad = (num) => num.toString().padStart(2, '0');

        return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
    };

    // useEffect qui s'exécute uniquement au montage du composant
    useEffect(() => {
        // Simuler un temps de chargement (vous pouvez remplacer par un vrai chargement de données)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5 secondes de chargement

        // Fonction de nettoyage pour éviter les fuites mémoire
        return () => clearTimeout(timer);
    }, []);



    useEffect(() => {
        console.log("Effet de consommation de viande initialisé. Survivants:", maxSurvivor, "Viande:", meat);

        const consommationViande = setInterval(() => {
            if (maxSurvivor > 0 && !isLoading) {
                // D'abord, vérifier s'il reste de la viande
                if (meat > 0) {
                    // S'il y a de la viande, en consommer (1 par survivant)
                    setMeat(prevMeat => {
                        const newMeat = Math.max(0, prevMeat - maxSurvivor);
                        console.log(`Consommation de viande: ${prevMeat} - ${maxSurvivor} = ${newMeat}`);
                        return newMeat; // Retourner la nouvelle valeur seulement
                    });
                } else {
                    // S'il n'y a plus de viande, perdre UN survivant
                    console.log("Plus de viande! Perte d'un survivant.");
                    setMaxSurvivor(prevMaxSurvivor => {
                        const newMax = prevMaxSurvivor - 1;
                        console.log(`Survivants restants: ${newMax}`);
                        return newMax;
                    });

                    // Ajuster aussi le nombre de survivants disponibles si nécessaire
                    setAvailableSurvivor(prevAvailable => {
                        if (prevAvailable > 0) {
                            console.log(`Survivants disponibles réduits: ${prevAvailable - 1}`);
                            return prevAvailable - 1;
                        }
                        console.log("Pas de survivants disponibles à réduire");
                        return 0;
                    });
                }
            } else {
                console.log("Pas de consommation: maxSurvivor =", maxSurvivor, "isLoading =", isLoading);
            }
        }, 8000); // Correction : 10 secondes = 10000ms

        return () => {
            console.log("Nettoyage de l'intervalle de consommation de viande");
            clearInterval(consommationViande);
        };
    }, [isLoading, maxSurvivor, meat]); // Simplification des dépendances

    // Afficher un écran de chargement pendant que isLoading est true
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <TreeLoader />
                <p className="ml-4 text-xl font-semibold text-black flex flex-row items-center justify-center gap-4">
                    Chargement de la map...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-center gap-[2vw] w-[100%]">
                <Link 
                    to="/" 
                    className="brutal-shadow p-[15px] bg-[#f6f6f6] hover:bg-[#f72585] cursor-pointer text-black hover:text-white font-bold transition-colors border-4 border-[#000] drop-shadow-xl group hover:duration-300 no-underline inline-block text-center"
                >
                    <img src={ArrowBack} alt="Stone logo" className="w-10 h-10 group-hover:scale-125 group-hover:duration-300" />
                </Link>

                <NavBar availableSurvivor={availableSurvivor} maxSurvivor={maxSurvivor} meat={meat} wood={wood} stone={stone} />
            </div>
            <div className="grid grid-cols-3 mt-[4vw] ml-[2vw] gap-4">
                <div className="relative"> {/* Ajout de relative pour contenir l'élément absolute */}
                    <Quest />
                    {isTimerActive && (
                        <div className="absolute top-[calc(100%+1rem)] left-0 flex flex-row items-center justify-center w-[20vw] brutal-shadow p-[15px] bg-[#f6f6f6] text-white font-bold transition-colors border-4 border-[#000] drop-shadow-xl gap-6">
                            <TimeClock />
                            <p className="text-lg font-bold text-[#4a90e2] drop-shadow-xl">{formatTime(timer)}</p>
                        </div>
                    )}
                </div>

                <GameMap
                    wood={wood}
                    setWood={setWood}
                    setMeat={setMeat}
                    setAvailableSurvivor={setAvailableSurvivor}
                    availableSurvivor={availableSurvivor}
                    setMaxSurvivor={setMaxSurvivor}
                    setIsTimerActive={setIsTimerActive}
                    className=""
                />
            </div>
        </div>
    );
}
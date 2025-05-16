import TreeIcon from "../assets/icons/tree.svg";
import ArrowBack from "../assets/icons/arrow-back.svg";
import { NavBar } from './NavBar';
import { Quest } from './Quest';
import { useState, useEffect } from 'react';
import TreeLoader from './Tree-loader'
import TimeClock from './Loader-clock'
import NotifDeath from './NotifDeath'
import { GameMap } from './Map';
import { Link, useNavigate } from "react-router-dom";

export function Game({ setFinalScore, setIsLoadingGameOver }) {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showNotifDeath, setShowNotifDeath] = useState(false);
    const [winterOrSummer, setWinterOrSummer] = useState(false); // false = été, true = hiv

    // Etats pour les survivants et ressources  
    const [maxSurvivor, setMaxSurvivor] = useState(0);
    const [availableSurvivor, setAvailableSurvivor] = useState(0);
    const [meat, setMeat] = useState(0); //8
    const [wood, setWood] = useState(6); //6
    const [stone, setStone] = useState(0);

    // Nouvel état pour suivre la dernière seconde traitée
    const [lastProcessedSecond, setLastProcessedSecond] = useState(0);

    // Ajout d'un nouvel état pour suivre la dernière seconde où le changement de saison a eu lieu
    const [lastSeasonChangeTime, setLastSeasonChangeTime] = useState(0);

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

    // Remplacement de votre useEffect pour le changement de saison
    useEffect(() => {
        // Vérifier si nous sommes à un multiple de 20 secondes ET que ce temps n'a pas déjà été traité
        if (timer > 0 && timer % 20 === 0 && timer !== lastSeasonChangeTime) {
            // Marquer ce temps comme traité pour éviter les exécutions multiples
            setLastSeasonChangeTime(timer);
            
            // Changer la saison
            setWinterOrSummer(prev => !prev);
            console.log(`[Timer ${timer}s] Changement de saison: ${winterOrSummer ? "Été" : "Hiver"}`);
        }
    }, [timer, lastSeasonChangeTime]);

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
        // Vérifier si nous sommes à un multiple de 8 secondes ET que ce temps n'a pas déjà été traité
        if (timer > 0 && timer % 8 === 0 && timer !== lastProcessedSecond) {
            console.log(`[Timer ${timer}s] Checking consumption. Max survivors: ${maxSurvivor}, Available: ${availableSurvivor}, Meat: ${meat}`);
            
            // Marquer ce temps comme traité pour éviter les exécutions multiples
            setLastProcessedSecond(timer);
            
            if (maxSurvivor > 0 && !isLoading) {
                // Vérifier si la viande est suffisante pour tous les survivants
                if (meat >= maxSurvivor) {
                    // S'il y a assez de viande, en consommer (1 par survivant)
                    setMeat(prevMeat => {
                        const newMeat = Math.max(0, prevMeat - maxSurvivor);
                        console.log(`Consommation de viande: ${prevMeat} - ${maxSurvivor} = ${newMeat}`);
                        return newMeat;
                    });
                } else {
                    // S'il n'y a pas assez de viande, perdre UN survivant
                    console.log("Pas assez de viande! Perte d'un survivant.");
                    
                    // Consommer toute la viande restante d'abord
                    if (meat > 0) {
                        setMeat(0);
                        console.log("Toute la viande restante consommée");
                    }

                    // Vérifier si des survivants sont disponibles
                    if (availableSurvivor > 0) {
                        // Si oui, réduire le nombre de survivants disponibles
                        setAvailableSurvivor(prev => prev - 1);
                        setMaxSurvivor(prev => prev - 1);
                        setShowNotifDeath(true);
                        console.log("Un survivant disponible est mort de faim");
                    } else {
                        // Si non, déclencher l'événement une seule fois
                        console.log("Pas de survivants disponibles - Retrait d'un survivant de la carte");
                        const event = new CustomEvent('removeSurvivorFromMap');
                        window.dispatchEvent(event);

                        // Réduire directement maxSurvivor, car un survivant sera retiré
                        setMaxSurvivor(prev => prev - 1);
                        setShowNotifDeath(true);
                    }
                }
            }
        }
    }, [timer, maxSurvivor, availableSurvivor, meat, isLoading, lastProcessedSecond]);

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
        <div className="flex flex-col h-screen relative">




            {/* Partie supérieure - Navbar et bouton retour */}
            <div className="flex flex-row items-center justify-start w-full mt-[5vw] px-[2vw] gap-[2vw]">
                <Link
                    to="/"
                    className="brutal-shadow p-[15px] bg-[#f6f6f6] hover:bg-[#f72585] cursor-pointer text-black hover:text-white font-bold transition-colors border-4 border-[#000] drop-shadow-xl group hover:duration-300 no-underline inline-block text-center active:shadow-none active:!shadow-none active:brutal-shadow:none active:translate-y-2 active:translate-x-2"
                >
                    <img src={ArrowBack} alt="Retour" className="w-10 h-10 group-hover:scale-125 group-hover:duration-300 " />
                </Link>

                <NavBar
                    availableSurvivor={availableSurvivor}
                    maxSurvivor={maxSurvivor}
                    meat={meat}
                    wood={wood}
                    stone={stone}
                />
            </div>

            {/* Partie centrale - Quêtes, Map et Notification de mort */}
            <div className="flex flex-row items-start justify-between mt-[5vw] mx-[2vw]">
                {/* Composant Quêtes à gauche */}
                <div className="w-[25vw]">
                    <Quest />
                </div>

                {/* Composant Map au centre */}
                <div className="">
                    <GameMap
                        wood={wood}
                        setWood={setWood}
                        setMeat={setMeat}
                        setAvailableSurvivor={setAvailableSurvivor}
                        availableSurvivor={availableSurvivor}
                        setMaxSurvivor={setMaxSurvivor}
                        setIsTimerActive={setIsTimerActive}
                        isTimerActive={isTimerActive}
                        setShowNotifDeath={setShowNotifDeath}
                        showNotifDeath={showNotifDeath}
                        winterOrSummer={winterOrSummer}
                    />
                </div>

                {/* Espace pour NotifDeath et autres contenus à droite */}
                <div className="w-[25vw] flex flex-col items-center justify-center  gap-[2vw]">
                    {/* Timer en position absolute par rapport à l'écran */}
                    {isTimerActive && (
                        <div className="flex flex-row items-center justify-center w-[15vw] brutal-shadow p-[15px] bg-[#f6f6f6] text-white font-bold transition-colors border-4 border-[#000] drop-shadow-xl gap-6 z-50">
                            <TimeClock />
                            <p className="text-lg font-bold text-[#4a90e2] drop-shadow-xl">{formatTime(timer)}</p>
                        </div>
                    )}
                    {/* Notification de mort, également en position absolue */}
                    {showNotifDeath && (
                        <div className="mt-[-5vw]">
                            <NotifDeath onClose={() => setShowNotifDeath(false)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
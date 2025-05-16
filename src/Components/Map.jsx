import { useState, useEffect } from 'react';
import ForestIcon from "../assets/icons/tree.svg";
import ForestIcon2 from "../assets/icons/tree2.svg";
import MountainIcon from "../assets/icons/mountain.svg";
import ShedIcon from "../assets/icons/shed.svg";
import SurvivorIcon from "../assets/icons/survivor.svg";

export function GameMap({ wood, setWood, setAvailableSurvivor, setMaxSurvivor, availableSurvivor, maxSurvivor, setIsTimerActive, setMeat }) {
    // État pour suivre la case sélectionnée (pour afficher le bouton de construction)
    const [selectedCell, setSelectedCell] = useState(null);

    const [survivorInForestWood, setSurvivorInForestWood] = useState(0);
    const [survivorInForestMeat, setSurvivorInForestMeat] = useState(0);

    // Créer une grille 5x5 avec des cases aléatoires et des icônes fixes pour les forêts
    const [grid, setGrid] = useState(() => {
        return Array(5).fill().map(() =>
            Array(5).fill().map(() => {
                const cellType = ["empty", "forest", "mountain", "empty"][Math.floor(Math.random() * 4)];
                return {
                    type: cellType,
                    // Si c'est une forêt, on choisit aléatoirement l'icône, mais une seule fois
                    forestIconType: cellType === "forest" ? (Math.random() > 0.5 ? "type1" : "type2") : null
                };
            })
        );
    });

    // Fonction pour gérer le clic sur une case
    const handleCellClick = (rowIndex, colIndex) => {
        const cell = grid[rowIndex][colIndex];

        // Si la case est vide, la sélectionner pour afficher le bouton
        if (cell.type === "empty") {
            setSelectedCell({ rowIndex, colIndex });
        } else if (cell.type === "forest" && !cell.hasSurvivor) {
            setSelectedCell({ rowIndex, colIndex });
        } else {
            // Sinon, désélectionner
            setSelectedCell(null);
        }
    };

    useEffect(() => {
        console.log("available  :", availableSurvivor);
    }, [availableSurvivor]);



    // Fonction pour construire une maison
    const buildHouse = (rowIndex, colIndex) => {
        // Vérifier s'il y a assez de bois
        if (wood >= 5) {
            // Vérifier si c'est la première maison (pas de maisons existantes)
            const isFirstHouse = !grid.flat().some(cell => cell.type === "house");
            
            // Créer une copie de la grille
            const newGrid = [...grid];
            // Modifier la case pour y construire une maison
            newGrid[rowIndex][colIndex] = { ...newGrid[rowIndex][colIndex], type: "house" };
            // Mettre à jour la grille
            setGrid(newGrid);
            // Réduire la quantité de bois
            setWood(wood - 5);
            // Ajouter 2 survivants
            setAvailableSurvivor(prev => prev + 2);
            setMaxSurvivor(prev => prev + 2);
            // Réinitialiser la sélection
            setSelectedCell(null);

            // Si c'est la première maison, activer le timer
            if (isFirstHouse) {
                console.log("Première maison construite - Timer activé!");
                setIsTimerActive(true);
            }
        } else {
            alert("Pas assez de bois ! Il faut 5 unités de bois pour construire une maison.");
        }
    };

    //Fonction pour envoyer un survivant explorer la forêt
    const sendSurvivorToForest = (rowIndex, colIndex) => {
        if (availableSurvivor > 0 && grid[rowIndex][colIndex].type === "forest" && !grid[rowIndex][colIndex].hasSurvivor) {
            // Réduire le nombre de survivants disponibles
            setAvailableSurvivor(prev => prev - 1);
            setSurvivorInForestWood(prev => prev + 1);
            const newGrid = [...grid];
            //Modifier la case pour montrer que le survivant est parti explorer
            newGrid[rowIndex][colIndex] = { ...newGrid[rowIndex][colIndex], type: "forest", hasSurvivor: true, cutWood: true };
            // Mettre à jour la grille
            setGrid(newGrid);
            // Réinitialiser la sélection
            setSelectedCell(null);
        }
    }

    //Fonction pour envoyer un survivant explorer la forêt
    const sendSurvivorToForestMeat = (rowIndex, colIndex) => {
        if (availableSurvivor > 0 && grid[rowIndex][colIndex].type === "forest" && !grid[rowIndex][colIndex].hasSurvivor) {
            // Réduire le nombre de survivants disponibles
            setAvailableSurvivor(prev => prev - 1);
            setSurvivorInForestMeat(prev => prev + 1);
            const newGrid = [...grid];
            //Modifier la case pour montrer que le survivant est parti explorer
            newGrid[rowIndex][colIndex] = { ...newGrid[rowIndex][colIndex], type: "forest", hasSurvivor: true, huntMeat: true };
            // Mettre à jour la grille
            setGrid(newGrid);
            // Réinitialiser la sélection
            setSelectedCell(null);
        }
    }

    useEffect(() => {
        // Vérifier si un survivant est revenu de la forêt
        if (survivorInForestWood > 0) {
            const timer = setInterval(() => {
                setWood(prev => prev + survivorInForestWood); // Ajouter 1 unité de bois
            }, 6000); // 5 secondes pour le test, à ajuster pour le jeu réel

            return () => clearInterval(timer);
        }
    }, [survivorInForestWood]);

    useEffect(() => {
        // Vérifier si un survivant est revenu de la forêt
        if (survivorInForestMeat > 0) {
            const timer = setInterval(() => {
                setMeat(prev => prev + survivorInForestMeat); // Ajouter 1 unité de bois
            }, 10000); // 5 secondes pour le test, à ajuster pour le jeu réel

            return () => clearInterval(timer);
        }
    }, [survivorInForestMeat]);

    // Fonction pour déterminer l'icône à afficher selon le type de case
    const renderCellContent = (cell, rowIndex, colIndex) => {

        const isSelected = selectedCell &&
        selectedCell.rowIndex === rowIndex &&
        selectedCell.colIndex === colIndex;

        switch (cell.type) {
            case "forest":
                // Utiliser le type d'icône de forêt stocké dans la cellule
                if (cell.hasSurvivor && cell.cutWood) {
                    return (
                        <div className="relative">
                            <img src={cell.forestIconType === "type1" ? ForestIcon : ForestIcon2} alt="Forêt" className="w-12 h-12" />
                            <span className="absolute top-[-0.5vw]  right-[-0.5vw] bg-[#8d6346]/75 text-white text-xs font-bold rounded-full w-[1.5vw]  h-[1.5vw] p-1 flex items-center justify-center">
                                <img src={SurvivorIcon} alt="Stone logo" className="w-10 h-10 drop-shadow-xl" />                              
                            </span>
                        </div>
                    );
                } else if (cell.hasSurvivor && cell.huntMeat) {
                    return (
                        <div className="relative">
                            <img src={cell.forestIconType === "type1" ? ForestIcon : ForestIcon2} alt="Forêt" className="w-12 h-12" />
                            <span className="absolute top-[-0.5vw]  right-[-0.5vw] bg-[#d82e3d]/75 text-white text-xs font-bold rounded-full w-[1.5vw]  h-[1.5vw] p-1 flex items-center justify-center">
                                <img src={SurvivorIcon} alt="Stone logo" className="w-10 h-10 drop-shadow-xl" />                              
                            </span>
                        </div>
                    );
                }
                else if (isSelected && !cell.hasSurvivor) {
                    return null;
                }
                else {
                    return <img src={cell.forestIconType === "type1" ? ForestIcon : ForestIcon2} alt="Forêt" className="w-12 h-12" />
                }
            case "mountain":
                return <img src={MountainIcon} alt="Montagne" className="w-12 h-12" />;
            case "house":
                return <img src={ShedIcon} alt="Maison" className="w-12 h-12" />;
            case "empty":
                // Ne rien afficher par défaut pour les cases vides
                return null;
            default:
                return null;
        }
    };

    return (
        <div className="brutal-shadow p-[15px] bg-[#f6f6f6] text-white font-bold transition-colors border-4 border-[#000] drop-shadow-xl h-full">
            <h2 className="text-xl font-bold mb-4 text-[#f72585]">Carte</h2>
            {/* Remplacer gap-0 par une solution sans gap */}
            <div className="flex flex-col mx-auto">
                {grid.map((row, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="flex flex-row">
                        {row.map((cell, colIndex) => {
                            // Vérifier si cette cellule est actuellement sélectionnée
                            const isSelected = selectedCell &&
                                selectedCell.rowIndex === rowIndex &&
                                selectedCell.colIndex === colIndex;

                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                    className={`w-[6vw] h-[6vw] flex flex-col items-center justify-center
                                        ${
                                            cell.type === "mountain" ? "bg-gray-300" :
                                                cell.type === "house" ? "bg-amber-100" :
                                                    "bg-[#e9ecef] hover:bg-gray-200"
                                        } ${isSelected ? "ring-2 ring-blue-500" : ""} cursor-pointer
                                    border-[0.5px] border-gray-400`}
                                >
                                    {renderCellContent(cell, rowIndex, colIndex)}

                                    {/* Afficher le bouton uniquement si la cellule est sélectionnée et de type empty */}
                                    {isSelected && cell.type === "empty" && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Empêcher le clic de se propager
                                                buildHouse(rowIndex, colIndex);
                                            }}
                                            className={`p-2  rounded-md ${wood >= 5 ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-400'}`}
                                            disabled={wood < 5}
                                        >
                                            {wood >= 5 ? "Construire" : "5 🪵 requis"}
                                        </button>
                                    )}

                                    {isSelected && cell.type === "forest" && !cell.hasSurvivor && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Empêcher le clic de se propager
                                                    sendSurvivorToForest(rowIndex, colIndex);
                                                }}
                                                className={`p-2 rounded-md ${availableSurvivor > 0 ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'}`}
                                                disabled={availableSurvivor <= 0}
                                            >
                                                {availableSurvivor > 0 ? "Explorer" : "Pas de survivants"}
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Empêcher le clic de se propager
                                                    // Ajouter ici la logique pour envoyer un survivant chasser
                                                    sendSurvivorToForestMeat(rowIndex, colIndex);
                                                }}
                                                className={`p-2 mt-2 rounded-md ${availableSurvivor > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400'}`}
                                                disabled={availableSurvivor <= 0}
                                            >
                                                {availableSurvivor > 0 ? "Chasser" : "Pas de survivants"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
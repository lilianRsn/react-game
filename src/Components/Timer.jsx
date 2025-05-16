import { useState } from 'react';

export function Map({ grid, wood, setWood, setAvailableSurvivor, setMaxSurvivor }) {
    // État local pour stocker la grille modifiée lorsqu'une maison est construite
    const [mapGrid, setMapGrid] = useState(grid);
    
    // Fonction pour gérer le clic sur une case
    const handleCellClick = (rowIndex, colIndex) => {
        // Vérifier si la cellule est vide et s'il y a assez de bois
        if (mapGrid[rowIndex][colIndex].type === "empty" && wood >= 5) {
            // Créer une nouvelle grille avec la maison ajoutée
            const newGrid = [...mapGrid];
            newGrid[rowIndex][colIndex] = { ...newGrid[rowIndex][colIndex], type: "house" };
            
            // Mettre à jour la grille
            setMapGrid(newGrid);
            
            // Réduire le bois utilisé
            setWood(wood - 5);
            
            // Ajouter 2 survivants (maximum et disponibles)
            setAvailableSurvivor(prev => prev + 2);
            setMaxSurvivor(prev => prev + 2);
        }
    };
    
    // Fonction pour déterminer la couleur de fond selon le type de cellule
    const getCellBackground = (type) => {
        switch (type) {
            case "forest":
                return "bg-green-700";
            case "house":
                return "bg-amber-800";
            case "empty":
                return "bg-gray-300";
            default:
                return "bg-gray-100";
        }
    };
    
    return (
        <div className="flex flex-col items-center gap-4 mt-8 ">
            <h2 className="text-2xl font-bold">Carte</h2>
            
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${mapGrid[0].length}, 1fr)` }}>
                {mapGrid.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <div 
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-16 h-16 ${getCellBackground(cell.type)} border border-gray-600 flex items-center justify-center cursor-pointer transition-colors`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                            {cell.type === "forest" && <span className="text-2xl">🌲</span>}
                            {cell.type === "house" && <span className="text-2xl">🏠</span>}
                            {cell.type === "empty" && wood >= 5 && <span className="opacity-50 hover:opacity-100">🏗️</span>}
                        </div>
                    ))
                ))}
            </div>
            
            {wood < 5 && (
                <p className="text-red-500 mt-2">Vous avez besoin de 5 unités de bois pour construire une maison</p>
            )}
        </div>
    );
}
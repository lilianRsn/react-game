import { useState } from "react";
import QuestIcon from "../assets/icons/quest.webp";

export function Quest() {
    // Tableau de quêtes avec titre et description
    // Utiliser useState pour gérer l'état des quêtes
    const [questList, setQuestList] = useState([
        {
            id: 1,
            title: "Premier abri",
            description: "Construire votre première cabane",
            completed: false,
            visible: true
        },
        {
            id: 2,
            title: "Exploration",
            description: "Envoyer un survivant explorer la forêt",
            completed: false,
            visible: true
        },
        {
            id: 3,
            title: "Chasseur",
            description: "Envoyer un survivant chasser",
            completed: false,
            visible: true
        },
        {
            id: 4,
            title: "Expansion",
            description: "Construire une deuxième cabane",
            completed: false,
            visible: true
        }
    ]);

    // Fonction pour mettre à jour l'état d'une quête
    const toggleQuest = (id) => {
        // D'abord, mettre à jour la quête cliquée
        const updatedList = questList.map(quest =>
            quest.id === id
                ? { ...quest, completed: !quest.completed }
                : quest
        );
        
        // Ensuite, vérifier si on doit cacher une quête précédente
        const finalList = updatedList.map(quest => {
            // Si la quête a un ID supérieur à 1 et que la quête qu'on vient de cocher est complétée
            if (quest.id === id - 1 && updatedList.find(q => q.id === id)?.completed) {
                // Cacher la quête précédente
                return { ...quest, visible: false };
            }
            return quest;
        });
        
        // Mettre à jour l'état avec la liste finale
        setQuestList(finalList);
    };

    // Fonction pour déterminer si une quête doit être en jaune
    // Une quête doit être en jaune uniquement si la quête précédente (par ID) est complétée
    const shouldBeHighlighted = (quest) => {
        if (quest.id === 1) return false; // La première quête n'est jamais en jaune
        
        // Trouver la quête avec l'ID précédent
        const previousQuest = questList.find(q => q.id === quest.id - 1);
        
        // Mettre en jaune si la quête précédente existe et est complétée
        return previousQuest && previousQuest.completed;
    };

    //Fonction pour déterminer si on opeut cocher la quete ou non 
    const canCheckQuest = (quest) => {
        // Si la quête est déjà complétée, on ne peut pas la cocher
        if (quest.completed) return false;
        
        // Si la quête est la première, on peut toujours la cocher
        if (quest.id === 1) return true;
        
        // Vérifier si la quête précédente est complétée
        const previousQuest = questList.find(q => q.id === quest.id - 1);
        return previousQuest && previousQuest.completed;
    };

    if (questList.map(quest => quest.completed).every(quest => quest === true)) {
        return (
            <div className="flex flex-col items-center justify-left w-[20vw] brutal-shadow p-[15px] bg-[#f6f6f6] text-[#eac085] font-bold transition-colors border-4 border-[#000] drop-shadow-xl gap-6 mt-[1vw] relative" >
                <h1 className="text-base font-bold flex flex-row items-center justify-center gap-2"><img src={QuestIcon} alt="Stone logo" className="w-10 h-10 drop-shadow-xl" />Quêtes</h1>
                <p className="text-base font-bold">Toutes les quêtes sont complétées !</p>
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-left w-[20vw] brutal-shadow p-[15px] bg-[#f6f6f6] text-white font-bold transition-colors border-4 border-[#000] drop-shadow-xl gap-6 mt-[1vw] relative" >
            <h1 className="text-base font-bold drop-shadow-xl flex flex-row items-center justify-center gap-2 text-[#eac085]"><img src={QuestIcon} alt="Stone logo" className="w-10 h-10 drop-shadow-xl" />Quêtes</h1>
            <ul className="flex flex-col gap-2">
                {questList
                    .filter(quest => quest.visible) // Ne montrer que les quêtes visibles
                    .map((quest, index) => (
                    <li key={quest.id} className={`flex flex-row items-start justify-start gap-2 p-[15px] text-black font-bold transition-colors border-4 border-[#000] drop-shadow-xl mt-[0.5vw] ${quest.completed ? 'bg-[#95d387] line-through' : 'bg-[#f25757]'} ${(shouldBeHighlighted(quest) && quest.completed === false) ? 'bg-[#fcbc5d]' : ''} ${canCheckQuest(quest) ? '' : 'opacity-50'}`}>
                        <input
                            type="checkbox"
                            className={`w-6 h-6 mt-1 cursor-pointer`}
                            disabled={!canCheckQuest(quest)}
                            checked={quest.completed}
                            onChange={() => toggleQuest(quest.id)}
                        />
                        <div className="flex flex-col items-start justify-start">
                            <p className="text-base font-bold">{quest.title}</p>
                            <p className="text-xs">{quest.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
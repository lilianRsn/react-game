import React from 'react';
import styled from 'styled-components';
import ArrowIcon from '../assets/icons/arrow-game.webp';

export function ModalCredits({handleCloseCredits}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-black/50">
            <div className="brutal-shadow p-[15px] text-black bg-[#f6f6f6] font-bold transition-colors border-4 border-[#000] drop-shadow-xl w-[20vw] max-h-[50vh] overflow-y-auto text-black">
                <h2 className="text-2xl font-bold mb-4">Crédits</h2>
                <p className="mb-4">Ce jeu a été développé par :</p>
                <ul className="list-none mb-[3vw] flex flex-col items-start gap-2">
                    <li className='flex flex-row justify-center items-center hover:-rotate-5 hover:animate-bounce hover:drop-shadow-xl/25 hover:duration-[0.1s] duration-[0.1s] group'>
                        <img 
                            src={ArrowIcon} 
                            alt="Stone logo" 
                            className="w-10 h-10 drop-shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2" 
                        />
                        REISINHO Lilian
                    </li>
                    <li className='flex flex-row justify-center items-center hover:-rotate-5 hover:animate-bounce hover:drop-shadow-xl/25 hover:duration-[0.1s] duration-[0.1s] group'>
                        <img 
                            src={ArrowIcon} 
                            alt="Stone logo" 
                            className="w-10 h-10 drop-shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2" 
                        />
                        CHARLEMAGNE Randy
                    </li>
                    <li className='flex flex-row justify-center items-center hover:-rotate-5 hover:animate-bounce hover:drop-shadow-xl/25 hover:duration-[0.1s] duration-[0.1s] group'>
                        <img 
                            src={ArrowIcon} 
                            alt="Stone logo" 
                            className="w-10 h-10 drop-shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2" 
                        />
                        MOREAU Valentin
                    </li>
                </ul>
                <p className="mb-4">Graphismes par : REISINHO Lilian</p>
                
                <button 
                    className="brutal-shadow p-[15px] text-black hover:text-white bg-[#f6f6f6] hover:bg-[#f72585] font-bold transition-colors cursor-pointer border-4 border-[#000] drop-shadow-xl w-[10vw] mt-[1vw] mb-[1vw]"
                    onClick={handleCloseCredits}>
                    Fermer
                </button>
            </div>
        </div>
    );
}

import Survivor from "../assets/icons/survivor.svg";
import Meat from "../assets/icons/meat.svg";
import Wood from "../assets/icons/wood.svg";
import Stone from "../assets/icons/stone.svg";
import XP from "../assets/icons/xp.png";
import '../assets/CSS/Navbar.css';



export function NavBar(props) {
    return (
        <div className="flex flex-row items-center justify-between w-[85vw]  brutal-shadow p-[15px] bg-[#f6f6f6] text-white font-bold transition-colors border-4 border-[#000] drop-shadow-xl gap-6 text-3xl">
            <div className="flex flex-row items-center justify-center gap-2" >
                <div className="flex flex-row items-center justify-between gap-2">
                    <img src={Survivor} alt="Stone logo" className="w-10 h-10 drop-shadow-xl" />
                    <p className="font-bold bg-[#eac085] text-white rounded-md px-2 py-1">{props.availableSurvivor}/{props.maxSurvivor}</p>
                </div>

                <div className="flex flex-row items-center justify-between gap-2">
                    <img src={Meat} alt="Stone logo" className="w-10 h-10 drop-shadow-xl" />
                    <p className="font-bold bg-[#d82e3d] text-white rounded-md px-2 py-1">{props.meat}</p>
                </div>

                <div className="flex flex-row items-center justify-between gap-2">
                    <img src={Wood} alt="Stone logo" className="w-10 h-10 drop-shadow-xl" />
                    <p className="font-bold bg-[#8d6346] text-white rounded-md px-2 py-1">{props.wood}</p>
                </div>

                <div className="flex flex-row items-center justify-between gap-2">
                    <img src={Stone} alt="Stone logo" className="w-10 h-10 drop-shadow-xl" />
                    <p className="font-bold bg-[#848c8e] text-white rounded-md px-2 py-1">{props.stone}</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-2"> 
                <img src={XP} alt="Stone logo" className="w-10 h-10 drop-shadow-xl" />
                <progress id="xpProgression" max="100" value="70" className="rounded-md drop-shadow-xl custom-progress"></progress>
            </div>


        </div>
    );
}
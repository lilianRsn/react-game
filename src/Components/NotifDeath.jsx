// Composant d'une notification de décès d'un survivant en position absolue

export default function NotifDeath({  }) { 
    return (
        <div className="z-50 flex justify-center items-center h-screen">
            <div className="brutal-shadow-alert p-[15px] bg-[#f6f6f6] text-[#ee6055] font-bold transition-colors border-4 border-[#000] drop-shadow-xl animate-death-notif">
                <p className="text-xl font-bold">Un survivant est mort !!!</p>
                <p>Un survivant est mort de faim.</p>
            </div>
        </div>
    );
}
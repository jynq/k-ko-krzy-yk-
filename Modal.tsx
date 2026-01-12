import React from 'react';
import { Trophy, RotateCcw, Frown } from 'lucide-react';
import { Player, GameStatus } from '../types';

interface ModalProps {
  status: GameStatus;
  winner: Player | null;
  onReset: () => void;
}

const Modal: React.FC<ModalProps> = ({ status, winner, onReset }) => {
  if (status === 'PLAYING') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-slate-700 transform scale-100 animate-in zoom-in-95 duration-200 text-center">
        
        <div className="mb-6 flex justify-center">
          {status === 'WON' ? (
             <div className="p-4 bg-emerald-500/10 rounded-full">
                <Trophy className="w-16 h-16 text-emerald-400" />
             </div>
          ) : (
            <div className="p-4 bg-slate-700/50 rounded-full">
                <Frown className="w-16 h-16 text-slate-400" />
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold mb-2 text-white">
          {status === 'WON' ? (
            <span className={winner === 'X' ? 'text-cyan-400' : 'text-rose-400'}>
              {winner} Wins!
            </span>
          ) : (
            <span className="text-slate-200">Draw!</span>
          )}
        </h2>
        
        <p className="text-slate-400 mb-8">
          {status === 'WON' 
            ? "Congratulations! Better luck next time opponent." 
            : "It's a tie. Both played well!"}
        </p>

        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/25 active:transform active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
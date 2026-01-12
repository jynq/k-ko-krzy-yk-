import React from 'react';
import { X, Circle } from 'lucide-react';
import { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinningSquare: boolean;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare, disabled }) => {
  return (
    <button
      className={`
        h-24 w-24 sm:h-32 sm:w-32 
        bg-slate-800 
        border-2 
        rounded-xl 
        flex items-center justify-center 
        transition-all duration-200 
        hover:bg-slate-700 
        focus:outline-none focus:ring-4 focus:ring-indigo-500/50
        ${isWinningSquare ? 'border-emerald-400 bg-emerald-900/20 shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'border-slate-700 shadow-lg'}
        ${disabled ? 'cursor-default' : 'cursor-pointer active:scale-95'}
      `}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square occupied by ${value}` : "Empty square"}
    >
      {value === 'X' && (
        <X 
          className={`w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 transition-all duration-300 ${isWinningSquare ? 'scale-110' : 'scale-100'}`} 
          strokeWidth={2.5} 
        />
      )}
      {value === 'O' && (
        <Circle 
          className={`w-12 h-12 sm:w-16 sm:h-16 text-rose-400 transition-all duration-300 ${isWinningSquare ? 'scale-110' : 'scale-100'}`} 
          strokeWidth={2.5} 
        />
      )}
    </button>
  );
};

export default Square;
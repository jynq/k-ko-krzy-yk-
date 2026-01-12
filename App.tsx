import React, { useState, useCallback } from 'react';
import Board from './components/Board';
import Modal from './components/Modal';
import { SquareValue, GameStatus, WinState, Player } from './types';
import { RotateCcw, Gamepad2 } from 'lucide-react';

const calculateWinner = (squares: SquareValue[]): WinState => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as Player, line: lines[i] };
    }
  }

  return { winner: null, line: null };
};

const App: React.FC = () => {
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const currentSquares = history[stepNumber];
  const { winner, line } = calculateWinner(currentSquares);
  
  let status: GameStatus = 'PLAYING';
  if (winner) {
    status = 'WON';
  } else if (!currentSquares.includes(null)) {
    status = 'DRAW';
  }

  const handleClick = useCallback((i: number) => {
    if (calculateWinner(currentSquares).winner || currentSquares[i]) {
      return;
    }

    const newSquares = currentSquares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';

    setHistory(history.slice(0, stepNumber + 1).concat([newSquares]));
    setStepNumber(stepNumber + 1);
    setXIsNext(!xIsNext);
  }, [currentSquares, history, stepNumber, xIsNext]);

  const resetGame = () => {
    setStepNumber(0);
    setHistory([Array(9).fill(null)]);
    setXIsNext(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full flex flex-col items-center gap-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <Gamepad2 className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              Tic-Tac-Toe
            </h1>
          </div>
          <p className="text-slate-400 font-medium">Classic game, modern style</p>
        </div>

        {/* Turn Indicator */}
        <div className="flex gap-4 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 shadow-inner">
          <div className={`
            flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300
            ${xIsNext && status === 'PLAYING' ? 'bg-slate-800 shadow-lg text-cyan-400' : 'text-slate-600 hover:text-slate-500'}
          `}>
            <span className="font-bold text-lg">Player X</span>
          </div>
          <div className={`
            flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300
            ${!xIsNext && status === 'PLAYING' ? 'bg-slate-800 shadow-lg text-rose-400' : 'text-slate-600 hover:text-slate-500'}
          `}>
            <span className="font-bold text-lg">Player O</span>
          </div>
        </div>

        {/* Game Board */}
        <Board
          squares={currentSquares}
          onClick={handleClick}
          winningLine={line}
          disabled={status !== 'PLAYING'}
        />

        {/* Action Bar */}
        <div className="flex gap-4 w-full px-4">
           <button
            onClick={resetGame}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold transition-colors border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Game
          </button>
        </div>

        {/* Footer */}
        <div className="text-slate-600 text-sm">
          Built with React & Tailwind
        </div>

      </div>

      <Modal
        status={status}
        winner={winner}
        onReset={resetGame}
      />
    </div>
  );
};

export default App;
export type Player = 'X' | 'O';
export type SquareValue = Player | null;

export type GameStatus = 'PLAYING' | 'WON' | 'DRAW';

export interface WinState {
  winner: Player | null;
  line: number[] | null;
}

export interface GameState {
  history: SquareValue[][];
  stepNumber: number;
  xIsNext: boolean;
  status: GameStatus;
  winState: WinState;
}
import { useState } from 'react';
import './App.css';

const Game: React.FC = () => {
  // Initialize the board state as an array of 9 null values
  const [board, setBoard] = useState(Array(9).fill(null));
  // Initialize the state to keep track of which player's turn it is (true for X, false for O)
  const [xIsNext, setXIsNext] = useState(true);

  // Function to handle the click event on a square
  const handleClick = (index: number) => {
    // Create a copy of the current board state
    const newBoard = board.slice();
    // If there's a winner or the square is already filled, exit the function
    if (calculateWinner(board) || board[index]) return;
    // Update the clicked square with the current player's symbol (X or O)
    newBoard[index] = xIsNext ? 'X' : 'O';
    // Update the board state with the new board
    setBoard(newBoard);
    // Toggle the turn to the next player
    setXIsNext(!xIsNext);
  };

  // Function to render a square
  const renderSquare = (index: number) => {
    return (
      <button
        className={`w-16 h-16 bg-white border border-gray-400 text-2xl font-bold ${
          calculateWinner(board)?.includes(index) ? 'bg-green-200' : ''
        }`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  // Function to reset the game
  const handleReset = () => {
    // Reset the board state to an array of 9 null values
    setBoard(Array(9).fill(null));
    // Set X as the next player
    setXIsNext(true);
  };

  // Determine if there is a winner
  const winner = calculateWinner(board);
  // Set the game status message
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="flex flex-col items-center">
      <div className="status mb-4 text-xl">{status}</div>
      <div className="board">
        <div className="board-row flex">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row flex">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row flex">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

// Function to calculate the winner
function calculateWinner(squares: Array<string | null>) {
  // Winning combinations
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

  // Check each winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // If all three squares in a line are the same and not null, return the winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // If no winner, return null
  return null;
}

export default Game;

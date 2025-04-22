import { JSX, useState } from "react";
import Block from "./components/Block";

type Winner = 'Alice' | 'Bob' | null;
type State = string | null;

function App(): JSX.Element {

  const [start, setStart] = useState(false);
  const [state, setState] = useState<State[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState('X');
  const [winner, setWinner] = useState<Winner>(null);

  // check the winer
  const checkWinner = (state: State[]): boolean => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];

      if (state[a] !== null && state[a] === state[b] && state[b] !== null && state[b] === state[c]) {
        return true;
      }
    }

    return false;
  };


  // handle when block click
  const handleBlockClick = (indx: number): void => {
    if (winner !== null || !start || state[indx] !== null) return;

    const stateCopy: State[] = Array.from(state);
    stateCopy[indx] = currentTurn;
    setCurrentTurn(() => currentTurn === 'X' ? 'O' : 'X');
    setState(stateCopy);
    const win = checkWinner(stateCopy);
    if (win) {
      setWinner(currentTurn === 'X' ? 'Alice' : 'Bob');
    }
  };

  // start the game
  const handleStart = (): void => {
    setStart(true);
  }

  // re-start the game 
  const handleRestart = (): void => {
    setState(Array(9).fill(null));
    setCurrentTurn('X');
    setWinner(null);
  }


  return (
    <div className="relative bg-[url('./assets/play-ground.jpg')] bg-cover bg-center w-full h-screen">
      {/* overlay */}
      <div className="absolute inset-0 bg-black opacity-75"></div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* start button */}
        {!start && <div className="flex items-center justify-center my-8">
          <button onClick={handleStart} className="text-lg text-white font-medium px-8 py-2 bg-linear-to-r from-green-600 to-green-700 rounded-full cursor-pointer uppercase active:scale-95 transition-all duration-100">Start</button>
        </div>}

        {/* player turn & winner */}
        {start && <div className="flex items-center justify-center my-9">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent uppercase">
            {winner !== null ? `${winner === 'Alice' ? 'Alice is the Winner.' : 'Bob is the Winner.'}` : `It's your turn, ${currentTurn === 'X' ? 'Alice' : 'Bob'}`}
          </h2>
        </div>}

        {/* board */}
        <div className="size-90 ring-4 ring-offset-2 ring-gray-500 bg-gray-300 rounded-sm shadow-2xl overflow-hidden">
          <div className="grid grid-cols-3 h-full border-2 rounded-sm border-gray-500 p-2">
            {
              state.map((_, indx) => (
                <Block key={indx} value={state[indx]} onClick={() => handleBlockClick(indx)} />
              ))
            }
          </div>
        </div>

        {/* reset button */}
        <div className="flex items-center justify-center my-8">
          <button disabled={!start} onClick={handleRestart} className={`${start ? 'cursor-pointer' : 'cursor-not-allowed'} text-lg text-white font-medium px-8 py-2 bg-linear-to-r from-red-600 to-red-700 rounded-full uppercase active:scale-95 transition-all duration-100`}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default App

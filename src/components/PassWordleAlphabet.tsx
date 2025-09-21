
interface PassWordleAlphabetProps {
  alphabet: string[];
  usedLetters: {[k:string]:string};
  onLetterClick: (ch: string) => void;
  gameOver: boolean;
}

const PassWordleAlphabet: React.FC<PassWordleAlphabetProps> = ({ alphabet, usedLetters, onLetterClick, gameOver }) => {
  const mid = Math.ceil(alphabet.length / 2);
  const row1 = alphabet.slice(0, mid);
  const row2 = alphabet.slice(mid);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex justify-center gap-1">
        {row1.map(ch => {
          let color = "bg-gray-200 text-gray-800";
          if (usedLetters[ch] === "correct") color = "bg-green-600 text-white";
          else if (usedLetters[ch] === "present") color = "bg-yellow-400 text-white";
          else if (usedLetters[ch] === "absent") color = "bg-gray-500 text-white";
          return (
            <button
              type="button"
              key={ch}
              onClick={() => onLetterClick(ch)}
              className={`w-8 h-8 flex items-center justify-center rounded text-lg font-bold font-mono ${color} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              tabIndex={gameOver ? -1 : 0}
            >{ch}</button>
          );
        })}
      </div>
      <div className="flex justify-center gap-1">
        {row2.map(ch => {
          let color = "bg-gray-200 text-gray-800";
          if (usedLetters[ch] === "correct") color = "bg-green-600 text-white";
          else if (usedLetters[ch] === "present") color = "bg-yellow-400 text-white";
          else if (usedLetters[ch] === "absent") color = "bg-gray-500 text-white";
          return (
            <button
              type="button"
              key={ch}
              onClick={() => onLetterClick(ch)}
              className={`w-8 h-8 flex items-center justify-center rounded text-lg font-bold font-mono ${color} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              tabIndex={gameOver ? -1 : 0}
            >{ch}</button>
          );
        })}
      </div>
    </div>
  );
};

export default PassWordleAlphabet;

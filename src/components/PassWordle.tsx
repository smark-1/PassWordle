import { useState, useEffect, useRef } from "react";
import PassWordleRow from "./PassWordleRow.tsx";
import PassWordleAlphabet from "./PassWordleAlphabet.tsx";
import PassWordleGuessButton from "./PassWordleGuessButton.tsx";
import PassWordleMessage from "./PassWordleMessage.tsx";
import PassWordleRestartButton from "./PassWordleRestartButton.tsx";

type RowType = "guess" | "input" | "empty";

interface GridRow {
    type: RowType;
    guess?: string;
    feedback?: string[];
}

function getFeedback(guess: string, answer: string) {
  const feedback = Array.from({ length: guess.length }, () => "absent");
  const answerArr = answer.split("");
  const guessArr = guess.split("");
  const used = Array.from({ length: guess.length }, () => false);
  for (let i = 0; i < guess.length; i++) {
    if (guessArr[i] === answerArr[i]) {
      feedback[i] = "correct";
      used[i] = true;
    }
  }
  for (let i = 0; i < guess.length; i++) {
    if (feedback[i] === "correct") continue;
    for (let j = 0; j < guess.length; j++) {
      if (!used[j] && guessArr[i] === answerArr[j]) {
        feedback[i] = "present";
        used[j] = true;
        break;
      }
    }
  }
  return feedback;
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

interface PassWordleProps {
  answer: string;
  onRestart: () => void;
}

// Helper to determine if a character is a non-letter
function isNonAlpha(ch: string) {
  return ch && !/^[a-zA-Z]$/.test(ch);
}

export default function PassWordle({ answer, onRestart }: PassWordleProps) {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<string[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [usedLetters, setUsedLetters] = useState<{[k:string]:string}>({});
    const wordLength = answer.length;
  const [currentGuessArr, setCurrentGuessArr] = useState<string[]>(Array(wordLength).fill(""));
  const [activeInputIdx, setActiveInputIdx] = useState(0);
  const inputRefs = useRef<(HTMLInputElement|null)[]>([]);


  // When answer changes, pre-fill non-alpha positions in currentGuessArr
  useEffect(() => {
    setCurrentGuessArr(
      Array.from({ length: wordLength }, (_, idx) =>
        isNonAlpha(answer[idx]) ? answer[idx] : ""
      )
    );
    setGuesses([]);
    setFeedbacks([]);
    setGameOver(false);
    setMessage("");
    setUsedLetters({});
    setTimeout(() => {
      const firstEditable = getNextEditableIdx(-1, 1, answer);
      setActiveInputIdx(firstEditable);
      inputRefs.current[firstEditable]?.focus();
    }, 0);
  }, [answer, getNextEditableIdx, wordLength]);

  function getNextEditableIdx(startIdx: number, direction: 1 | -1, answer: string): number {
    let idx = startIdx + direction;
    while (idx >= 0 && idx < wordLength) {
      if (!isNonAlpha(answer[idx])) return idx;
      idx += direction;
    }
    return startIdx; // fallback to current if none found
  }

  function handleInput(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (isNonAlpha(answer[idx])) return;
    // Only allow a single alphabetic character
    if (value.length === 1 && /^[a-zA-Z]$/.test(value)) {
      setCurrentGuessArr(prev => {
        const next = [...prev];
        next[idx] = value;
        return next;
      });
      // Find next editable cell
      if (idx < wordLength - 1) {
        const nextIdx = getNextEditableIdx(idx, 1, answer);
        setActiveInputIdx(nextIdx);
        setTimeout(() => {
          inputRefs.current[nextIdx]?.focus();
        }, 0);
      }
    } else if (value === "") {
      setCurrentGuessArr(prev => {
        const next = [...prev];
        next[idx] = "";
        return next;
      });
    }
  }

  function handleFocus(idx: number) {
    setActiveInputIdx(idx);
  }

  function handleKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (currentGuessArr[idx] === "" && idx > 0) {
        const prevIdx = getNextEditableIdx(idx, -1, answer);
        inputRefs.current[prevIdx]?.focus();
        setActiveInputIdx(prevIdx);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      const prevIdx = getNextEditableIdx(idx, -1, answer);
      inputRefs.current[prevIdx]?.focus();
      setActiveInputIdx(prevIdx);
    } else if (e.key === "ArrowRight" && idx < wordLength - 1) {
      const nextIdx = getNextEditableIdx(idx, 1, answer);
      inputRefs.current[nextIdx]?.focus();
      setActiveInputIdx(nextIdx);
    }
  }

  function handleLetterClick(ch: string) {
    if (gameOver || gridRows[guesses.length]?.type !== "input") return;
    setCurrentGuessArr(prev => {
      const next = [...prev];
      next[activeInputIdx] = ch;
      return next;
    });
    // Find next editable cell
    const nextIdx = getNextEditableIdx(activeInputIdx, 1, answer);
    setActiveInputIdx(nextIdx);
    setTimeout(() => {
      inputRefs.current[nextIdx]?.focus();
    }, 0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (gameOver) return;
    // Fill in non-alpha positions with answer
    const guessArr = currentGuessArr.map((ch, idx) =>
      isNonAlpha(answer[idx]) ? answer[idx] : ch
    );
    const currentGuess = guessArr.join("");
    if (currentGuess.length !== wordLength || guessArr.some(l => !l)) {
      setMessage(`Guess must be ${wordLength} letters.`);
      return;
    }

    const fb = getFeedback(currentGuess, answer);
    setGuesses([...guesses, currentGuess]);
    setFeedbacks([...feedbacks, fb]);
    setCurrentGuessArr(Array.from({ length: wordLength }, (_, idx) =>
      isNonAlpha(answer[idx]) ? answer[idx] : ""
    ));
    setMessage("");
    setUsedLetters(prev => {
      const next = {...prev};
      currentGuess.split("").forEach((ch, i) => {
        if (fb[i] === "correct") next[ch] = "correct";
        else if (fb[i] === "present" && next[ch] !== "correct") next[ch] = "present";
        else if (fb[i] === "absent" && !next[ch]) next[ch] = "absent";
      });
      return next;
    });
    // Focus first editable cell only after submit
    setTimeout(() => {
      const firstEditable = getNextEditableIdx(-1, 1, answer);
      setActiveInputIdx(firstEditable);
      inputRefs.current[firstEditable]?.focus();
    }, 0);
    if (currentGuess === answer) {
      setGameOver(true);
      setMessage("You win! 🎉");
    } else if (guesses.length + 1 === 6) {
      setGameOver(true);
      setMessage(`You lose! The password was "${answer}".`);
    }
  }

  function handleRestart() {
    onRestart();
  }

  // Helper for grid rendering
    const gridRows: GridRow[] = Array.from({ length: 6 }, (_, i) => {
        if (i < guesses.length) {
            const guess = guesses[i];
            const feedback = feedbacks[i] || Array(wordLength).fill("");
            return { type: "guess" as RowType, guess, feedback };
        } else if (i === guesses.length && !gameOver) {
            return { type: "input" as RowType };
        } else {
            return { type: "empty" as RowType };
        }
    });

  // Compute canGuess: all editable cells filled and not already guessed
  const guessArr = currentGuessArr.map((ch, idx) =>
    isNonAlpha(answer[idx]) ? answer[idx] : ch
  );
  const currentGuess = guessArr.join("");
  const isComplete = currentGuess.length === wordLength && guessArr.every((ch, idx) => isNonAlpha(answer[idx]) || ch);
  const isAlreadyGuessed = guesses.includes(currentGuess);
  const canGuess = !gameOver && isComplete && !isAlreadyGuessed;

  // Show error message immediately if guess is already guessed
  useEffect(() => {
    if (isAlreadyGuessed && isComplete) {
      setMessage("Already guessed.");
    } else if (!isComplete && message === "Already guessed.") {
      setMessage("");
    } else if (message === "Already guessed." && !isAlreadyGuessed) {
      setMessage("");
    }
  }, [currentGuess, guesses, isComplete, isAlreadyGuessed, message]);

  return (
    <div className="w-full flex flex-col items-center mt-8 text-center">
      <h2 className="text-3xl font-bold mb-4">PassWordle</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col items-center gap-2">
        <div className="grid grid-rows-6 gap-2 mb-4 w-full">
          {gridRows.map((row, rowIdx) => (
            <PassWordleRow
              key={rowIdx}
              type={row.type}
              guess={row.guess}
              feedback={row.feedback}
              wordLength={wordLength}
              currentGuessArr={row.type === "input" ? currentGuessArr : undefined}
              answer={row.type === "input" ? answer : undefined}
              inputRefs={row.type === "input" ? inputRefs.current : undefined}
              activeInputIdx={row.type === "input" ? activeInputIdx : undefined}
              handleInput={row.type === "input" ? handleInput : undefined}
              handleKeyDown={row.type === "input" ? handleKeyDown : undefined}
              handleFocus={row.type === "input" ? handleFocus : undefined}
              gameOver={gameOver}
            />
          ))}
        </div>
        <PassWordleGuessButton disabled={!canGuess} />
      </form>
      <PassWordleMessage message={message} />
      <div className="mb-4">
        <PassWordleAlphabet
          alphabet={ALPHABET}
          usedLetters={usedLetters}
          onLetterClick={handleLetterClick}
          gameOver={gameOver}
        />
      </div>
      {gameOver && <PassWordleRestartButton onClick={handleRestart} />}
    </div>
  );
}

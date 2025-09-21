import React from "react";
import PassWordleCell from "./PassWordleCell.tsx";

interface PassWordleRowProps {
  type: "guess" | "input" | "empty";
  guess?: string;
  feedback?: string[];
  wordLength: number;
  currentGuessArr?: string[];
  answer?: string;
  inputRefs?: (HTMLInputElement|null)[];
  activeInputIdx?: number;
  handleInput?: (idx: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleFocus?: (idx: number) => void;
  gameOver?: boolean;
}

const PassWordleRow: React.FC<PassWordleRowProps> = (props: PassWordleRowProps) => {
  const { type, guess, feedback, wordLength, currentGuessArr, answer, inputRefs, activeInputIdx, handleInput, handleKeyDown, handleFocus, gameOver } = props;
  if (type === "guess") {
    return (
      <div className="flex justify-center gap-2 w-auto">
        {Array.from({ length: wordLength }, (_, colIdx) => (
          <PassWordleCell
            key={colIdx}
            value={guess?.[colIdx] ?? ""}
            feedback={feedback?.[colIdx] ?? ""}
          />
        ))}
      </div>
    );
  } else if (type === "input") {
    return (
      <div className="flex justify-center gap-2 w-auto">
        {Array.from({ length: wordLength }, (_, idx) => (
          <PassWordleCell
            key={idx}
            value={answer && answer[idx] && !/^[a-zA-Z]$/.test(answer[idx]) ? answer[idx] : currentGuessArr?.[idx] ?? ""}
            isInput
            inputRef={inputRefs ? (el: HTMLInputElement|null) => { inputRefs[idx] = el; } : undefined}
            onChange={handleInput ? (e: React.ChangeEvent<HTMLInputElement>) => handleInput(idx, e) : undefined}
            onKeyDown={handleKeyDown ? (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(idx, e) : undefined}
            onFocus={handleFocus ? () => handleFocus(idx) : undefined}
            disabled={!!(gameOver || (answer && answer[idx] && !/^[a-zA-Z]$/.test(answer[idx])))}
            active={activeInputIdx === idx}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center gap-2 w-auto">
        {Array.from({ length: wordLength }, (_, colIdx) => (
          <PassWordleCell key={colIdx} value="" />
        ))}
      </div>
    );
  }
};

export default PassWordleRow;

import React from "react";

interface PassWordleCellProps {
  value: string;
  feedback?: string;
  isInput?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  disabled?: boolean;
  active?: boolean;
}

const PassWordleCell: React.FC<PassWordleCellProps> = ({ value, feedback, isInput, inputRef, onChange, onKeyDown, onFocus, disabled, active }) => {
  let color = "bg-gray-200 border-gray-400 text-gray-800";
  if (feedback === "correct") color = "bg-green-600 border-green-700 text-white";
  else if (feedback === "present") color = "bg-yellow-400 border-yellow-600 text-white";
  else if (feedback === "absent") color = "bg-gray-500 border-gray-700 text-white";
  if (isInput) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        disabled={disabled}
        className={`w-12 h-12 text-center text-2xl font-bold font-mono border-2 rounded focus:outline-none focus:border-blue-500 lowercase ${active ? 'border-blue-500' : 'border-blue-400'} ${disabled ? 'bg-gray-300 text-gray-600' : ''}`}
        maxLength={1}
        autoFocus={active}
        inputMode="text"
        autoComplete="off"
        name="wordle-cell-input"
        id="wordle-cell-input"
        data-lpignore="true"
        data-1p-ignore="true"
        data-autocomplete="off"
      />
    );
  }
  return (
    <span className={`w-12 h-12 flex items-center justify-center border-2 rounded text-2xl font-bold font-mono ${color}`}>{value}</span>
  );
};

export default PassWordleCell;

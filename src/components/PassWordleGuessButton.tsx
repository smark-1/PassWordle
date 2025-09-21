import React from "react";

interface PassWordleGuessButtonProps {
  onClick?: () => void;
  disabled: boolean;
}

const PassWordleGuessButton: React.FC<PassWordleGuessButtonProps> = ({ onClick, disabled }) => (
  <button type="submit" onClick={onClick} disabled={disabled} className="bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50">Guess</button>
);

export default PassWordleGuessButton;


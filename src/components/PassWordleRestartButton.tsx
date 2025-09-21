import React from "react";

interface PassWordleRestartButtonProps {
  onClick: () => void;
}

const PassWordleRestartButton: React.FC<PassWordleRestartButtonProps> = ({ onClick }: PassWordleRestartButtonProps) => (
  <button onClick={onClick} className="bg-green-600 text-white px-4 py-2 rounded font-bold">Restart</button>
);

export default PassWordleRestartButton;


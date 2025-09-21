import React from "react";

interface PassWordleMessageProps {
  message: string;
}

const PassWordleMessage: React.FC<PassWordleMessageProps> = ({ message }) => (
  <div className="min-h-[2em] mb-2 text-red-600 font-semibold">{message}</div>
);

export default PassWordleMessage;


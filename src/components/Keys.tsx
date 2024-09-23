import React from "react";

interface KeysProps {
  key: string;
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Key: React.FC<KeysProps> = ({ key, value, onClick }) => {
  const isWideButton = value === 'AC' || value === '0';
  const isEqualsButton = value === '=';
  const isOperatorButton = value === '÷' || value === 'x' || value === '-' || value === '+' || value === '±';
  const isClearButton = value === 'AC';
  const buttonWidth = isWideButton ? 'key col-span-2' : 'key';
  const buttonBackground = isEqualsButton ? 'bg-green-500' : isOperatorButton ? 'bg-yellow-500' : isClearButton ? 'bg-red-500' : 'bg-gray-500';
  const buttonHieght = isEqualsButton ? 'row-span-2' : 'row-span-1';
  const buttonClass = `text-white ${buttonWidth} ${buttonBackground} ${buttonHieght} p-4 text-2xl font-bold border border-white`;

  return (
    <button id={key} data-action={key} className={buttonClass } onClick={onClick}>
      {value}
    </button>
  );
};

export default Key;
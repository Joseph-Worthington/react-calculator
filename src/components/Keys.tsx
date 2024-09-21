import React from "react";

interface KeysProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const keyObject = {
  clear: "AC",
  divide: "÷",
  multiply: "x",
  seven: "7",
  eight: "8",
  nine: "9",
  subtract: "-",
  four: "4",
  five: "5",
  six: "6",
  add: "+",
  one: "1",
  two: "2",
  three: "3",
  equals: "=",
  zero: "0",
  decimal: ".",
};

const Keys: React.FC<KeysProps> = ({onClick}) => {
  return (
    <div className="keys">
      {
        Object.entries(keyObject).map(([key, value]) => (
          <button id={key} data-action={key} className="key" onClick={onClick}>{value}</button>
        ))
      }
    </div>
  );
};

export default Keys;
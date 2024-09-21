import React from "react";


interface InputProps {
  input: string;
}

const Input: React.FC<InputProps> = ({input}) => {
  return <div id="display">{input}</div>;
}

export default Input;
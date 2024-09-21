import React from "react";


interface InputProps {
  output: string;
}

const Output: React.FC<InputProps> = ({output}) => {
  return <div id="display">{output}</div>;
}

export default Output;
import React from 'react';
import Input from './components/Input';
import Output from './components/Output';
import Keys from './components/Keys';
import './App.css';
import { evaluate } from 'mathjs';

function App() {

  const [input, setInput] = React.useState('0');
  const [output, setOutput] = React.useState('');
  const [allowDecimal, setAllowDecimal] = React.useState(true);

  const calculate = (sum: string) => {
    let calcualtion = sum.replace(/x/g, '*').replace(/÷/g, '/');
    try {
      const result = evaluate(calcualtion);
      setOutput(output + input + '=' + result.toString());
      setInput(result.toString());
      setAllowDecimal(true);
    } catch (err) {
      console.log(err);
      setOutput('Error');
    }
  };

  const clear = () => {
    setInput('0');
    setOutput('');
    setAllowDecimal(true);
  }

  const setTheInput = (value: string) => {
    if(input === '0'){
      setInput(value);
    }else if(output.includes('=')){
        if(value === '-' || value === 'x' || value === '÷' || value === '+'){
          setInput(input + value);
          setOutput('');
          return;
        }else{
          setInput(value);
          setOutput('');
          return;
        }
    }else{
      setInput(input + value );
    }
  }

  const chackOperator = (value: string) => {
    if( input.endsWith('x') || input.endsWith('÷') || input.endsWith('+') ){
      setInput(input.slice(0, -1) + value);
    }else if(input.endsWith('-')){
      if(input.charAt(input.length - 2) === 'x' || input.charAt(input.length - 2) === '÷' || input.charAt(input.length - 2) === '+'){
        setInput(input.slice(0, -2) + value);
      }else{
        setInput(input.slice(0, -1) + value);
      }
    }else if(input.length > 0){
      setTheInput(value);
    }
  }


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget
    const action = key.dataset.action;
    const value = key.innerHTML;

    switch(action){
      case 'clear':
        clear();
        break;
      case 'equals':
        calculate(output + input);
        break;
      case 'decimal':
        if(allowDecimal === false){
          return;
        }
        setInput(input + '.');
        setAllowDecimal(false);
        break;
      case 'subtract':
          setTheInput(value);
          setAllowDecimal(true);
        break;
      case 'add':
      case 'multiply':
      case 'divide': 
        setAllowDecimal(true);
        chackOperator(value);
        break;
      default:
          setTheInput(value);
        break;
    }
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

  return (
    <div className="App">
      <div id="calculator" className='flex flex-col w-96 m-auto max-h-fit border border-gray-900 h-screen justify-center'>
        <div className="text-white bg-gray-900 min-h-28 flex flex-col justify-end items-end p-5 text-3xl">
          <Output output={output} />
          <Input input={input} />
        </div>
        <div className="keys grid grid-cols-4">
          {
            Object.entries(keyObject).map(([key, value], index: number) => (
              <Keys key={index} id={key} value={value} onClick={handleClick} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;

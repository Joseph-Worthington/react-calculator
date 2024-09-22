import React from 'react';
import Input from './components/Input';
import Output from './components/Output';
import Keys from './components/Keys';
import './App.css';
import { evaluate } from 'mathjs';

function App() {

  const [input, setInput] = React.useState('');
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

  return (
    <div className="App">
      <div id="calculator">
        <Output output={output} />
        <Input input={input} />
        <Keys onClick={handleClick} />
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import Input from './components/Input';
import Output from './components/Output';
import Keys from './components/Keys';
import './App.css';
import { evaluate } from 'mathjs';

function App() {

  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');

  const calculate = (sum: string) => {
    let calcualtion = sum.replace(/x/g, '*').replace(/÷/g, '/');
    try {
      const result = evaluate(calcualtion);
      setOutput(output + input + '=' + result.toString());
      setInput(result.toString());
    } catch (err) {
      console.log(err);
      setOutput('Error');
    }
  };

  const clear = () => {
    setInput('0');
    setOutput('');
  }

  const setTheInput = (value: string) => {
    if(input === '0'){
      setInput(value);
    }else if(output.includes('=')){
        setInput(value);
        setOutput(input);
        return;
    }else{
      setInput(input + value );
    }
  }


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget
    const action = key.dataset.action;
    const value = key.innerHTML;
    console.log(action);

    switch(action){
      case 'clear':
        clear();
        break;
      case 'equals':
        calculate(output + input);
        break;
      case 'decimal':
        if(input.includes('.')){
          return;
        }
        setInput(input + '.');
        break;
      case 'subtract':
          setTheInput(value);
        break;
      case 'add':
      case 'multiply':
      case 'divide':
        if(output.endsWith('x') || output.endsWith('÷') || output.endsWith('+') || output.endsWith('-')){
          setOutput(output.slice(0, -1));
        }
        if(input.includes('-')){
          setInput('');
        }
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

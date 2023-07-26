import React, { useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')

  const handleButtonClick = (buttonValue) => {
    if (buttonValue === 'C') {
      clearResult()
    } else if (buttonValue === '=') {
      calculateResult()
    } else {
      appendValue(buttonValue)
    }
  }

  const clearResult = () => {
    setInputValue('')
  }

  const calculateResult = () => {
    try {
      setInputValue(eval(inputValue).toString())
    } catch (error) {
      setInputValue('Error')
    }
  }

  const appendValue = (buttonValue) => {
    setInputValue(inputValue + buttonValue)
  }

  return (
    <div className='calculator'>
      <input type='text' id='result' value={inputValue} readOnly />
      <div className='buttons'>
        <button onClick={() => handleButtonClick('C')} className='clear'>
          C
        </button>
        <button onClick={() => handleButtonClick('/')} className='operator'>
          /
        </button>
        <button onClick={() => handleButtonClick('*')} className='operator'>
          *
        </button>
        <button onClick={() => handleButtonClick('-')} className='operator'>
          -
        </button>
        <button onClick={() => handleButtonClick('7')} className='number'>
          7
        </button>
        <button onClick={() => handleButtonClick('8')} className='number'>
          8
        </button>
        <button onClick={() => handleButtonClick('9')} className='number'>
          9
        </button>
        <button onClick={() => handleButtonClick('+')} className='operator'>
          +
        </button>
        <button onClick={() => handleButtonClick('4')} className='number'>
          4
        </button>
        <button onClick={() => handleButtonClick('5')} className='number'>
          5
        </button>
        <button onClick={() => handleButtonClick('6')} className='number'>
          6
        </button>
        <button onClick={() => handleButtonClick('=')} className='equals'>
          =
        </button>
        <button onClick={() => handleButtonClick('1')} className='number'>
          1
        </button>
        <button onClick={() => handleButtonClick('2')} className='number'>
          2
        </button>
        <button onClick={() => handleButtonClick('3')} className='number'>
          3
        </button>
        <button onClick={() => handleButtonClick('0')} className='number'>
          0
        </button>
        <button onClick={() => handleButtonClick('.')} className='decimal'>
          .
        </button>
      </div>
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import { evaluate } from 'mathjs' // Import the evaluate function from mathjs
import './App.css'

const themes = {
  default: {
    backgroundColor: '#f0f0f0',
    buttonBgColor: '#e0e0e0',
    buttonTextColor: '#333',
  },
  purple: {
    backgroundColor: '#6c5ce7',
    buttonBgColor: '#4b39a5',
    buttonTextColor: '#fff',
  },
  green: {
    backgroundColor: '#00b894',
    buttonBgColor: '#009e74',
    buttonTextColor: '#fff',
  },
  blue: {
    backgroundColor: '#3498db',
    buttonBgColor: '#2980b9',
    buttonTextColor: '#fff',
  },
  red: {
    backgroundColor: '#e74c3c',
    buttonBgColor: '#c0392b',
    buttonTextColor: '#fff',
  },
}

function App() {
  const [inputValue, setInputValue] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('default')

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
      const result = evaluate(inputValue)
      if (typeof result !== 'undefined') {
        setInputValue(result.toString())
      } else {
        setInputValue('Error')
      }
    } catch (error) {
      setInputValue('Error')
    }
  }

  const keyboardButtonHandler = (buttonValue) => {
    if (buttonValue === '=') {
      calculateResult()
    } else {
      setInputValue((prevValue) => prevValue + buttonValue)
    }
  }

  const appendValue = (buttonValue) => {
    setInputValue(inputValue + buttonValue)
  }

  // Add event listener to handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key

      // Check if the key is a number, operator, or equals sign
      if (/[0-9+\-*/.=]/.test(key)) {
        event.preventDefault()
        keyboardButtonHandler(key)
      } else if (key === 'Enter') {
        event.preventDefault()
        calculateResult()
      } else if (key === 'Escape' || 'Delete') {
        event.preventDefault()
        clearResult()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [keyboardButtonHandler, calculateResult, clearResult])

  const themeStyles = themes[selectedTheme]

  return (
    <div
      className='calculator'
      style={{ backgroundColor: themeStyles.backgroundColor }}
    >
      <div className='theme-selector'>
        <label htmlFor='themeSelect'>Choose a Theme:</label>
        <select
          id='themeSelect'
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          {Object.keys(themes).map((themeKey) => (
            <option key={themeKey} value={themeKey}>
              {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
            </option>
          ))}
        </select>
      </div>
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

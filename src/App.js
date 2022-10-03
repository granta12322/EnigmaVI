
import './App.css';
import { Rotor, RotorProps } from './components/rotor/rotor';
import { RotorSelectMenu } from './components/controlPanel/RotorSelectMenu';
import { RotorArray } from './components/rotorArray/rotorArray';
import { encodeLetter, stepRotorsHook4, stepRotorsHook2, resetRotors, resetPositions } from './components/rotorArray/rotorArray.bl';
import {KeyBoard} from './components/keyboard/keyBoard'
import React, {useState, useEffect} from 'react'

import {createCharacterIndexMap, stepRotor} from './components/rotor/rotor.bl'
import { getValuesOfKeyFromArray, zip } from './helpers/collections';
import { isParameter } from 'typescript';
import { deepCopy } from './helpers/math';


let charsToMap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
//charsToMap = charsToMap.slice(0,6)
let characterRows = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M']
]



let defaultRotorArray =  [
    {

      position:0,
      offset: 0,
      characterMap: createCharacterIndexMap(1, charsToMap)
    },
    {

      position:0,
      offset: 0,
      characterMap: createCharacterIndexMap(2, charsToMap)
    }
  ]


/**
 * rotorNumber: number on rotor used to seed char map
 * rotorIndex: position of rotor in array
 * rotorPosition: rotor position change from original offset
 * rotorOffset: initial rotor offset
 * @returns 
 */
function App() {



  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  
  const [rotorSelectIsOpen,setRotorSelectIsOpen] = useState(0)
  
  const [initialOffsets, setInitialOffsets] = useState([0])


  const [rotorArray, setRotorArray] = useState(defaultRotorArray)




  const buildRotorArray = (rotorNumbers, initialOffsets) => {
    let charsToMap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    //.console.log("Calling " + arguments.callee.toString())
    console.log("Calling buildRotorArray")
    console.log(rotorNumbers, initialOffsets)
    let rotors = [];
     for(let rotorSetup of zip(rotorNumbers, initialOffsets) )  {
        console.log("Building individual rotor")

        let rotorCharMap = createCharacterIndexMap(Number(rotorSetup[0]),charsToMap)
        console.log(rotorCharMap)
        let rotor = {
          position: 0,
          characterMap: rotorCharMap,
          offset: rotorSetup[1]
        }
        rotors.push(rotor)
        console.log(rotor)
      }
    console.log("Rotors:")
    console.log(rotors)
    setRotorArray(rotors)
  }

  const handleKeyPress = (inputChar) => {
    console.log("Handlign key press")
    
    setInput(input + inputChar)

    setOutput(output + encodeLetter(rotorArray,inputChar))

    console.log(getValuesOfKeyFromArray(rotorArray,"offset"))
    
    stepRotorsHook4(rotorArray)


  }


  const toggleRotorMenu = () => setRotorSelectIsOpen(! rotorSelectIsOpen)
  

  const reset = () => {
    console.log("Reset pos called")
    console.log(rotorArray)
    resetPositions(rotorArray)
  console.log(rotorArray)
  }


  const clearDisplay = () => {setInput("");setOutput("")};

  console.log("Rotor Ar")
  console.log(rotorArray)
  return (
    <div className="App">
      <header className="App-header">
      <div className='enigmaMachine bordered'
           characterrows = {characterRows} 
        >
        <div className='display' >
          <div className='display' >
            <p>{input}</p>
          </div>
          <div className='display' >
            <p>{output}</p>
          </div>
        </div>
        <div style = {{display:"flex", "flex-direction":"row"}}>
           <RotorArray 
              rotorArray={rotorArray}
            />
          <div className='controlPanel bordered'>
            <h3 style = {{paddingTop:"3px"}}>Control Panel</h3>
            <div className='controlPanelButton bordered' onClick={reset}>Reset Rotors</div>
            <div className='controlPanelButton bordered' onClick = {toggleRotorMenu}>Choose Rotors</div>
            <div className='controlPanelButton bordered' onClick={clearDisplay}>Clear Message</div> 
          </div>
        </div>
        <KeyBoard   characterRows={characterRows} handleKeyPress = {handleKeyPress}// ? Infinite loop error: Pass as an arrow function to prevent infinite rende rloop issue } 
        />      
      </div>
      
{

rotorSelectIsOpen
?       <RotorSelectMenu  buildRotorArray={buildRotorArray} />

: null
}      </header>
    </div>
  );
}


export default App;

  
  

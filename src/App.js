
import './App.css';
import { Rotor } from './components/rotor/rotor';
import { RotorArray } from './components/rotorArray/rotorArray';
import { encodeLetter } from './components/rotorArray/rotorArray.bl';
import {KeyBoard} from './components/keyboard/keyBoard'
import React, {useState} from 'react'
import { stepRotorsHook2 } from './components/rotorArray/rotorArray.bl';
import {buildRotor} from './components/rotor/rotor.bl'
import { getValuesOfKeyFromArray } from './helpers/collections';

let charsToMap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
//charsToMap = charsToMap.slice(0,6)
let characterRows = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M']
]



let defaultRotorArray = {
  rotorArray: [
    {
      rotorNumber:1,
      position:0,
      charsToMap: charsToMap,
      charecterMap: buildRotor(1, charsToMap)
    },
    {
      rotorNumber:2,
      position:0,
      charsToMap: charsToMap,
      charecterMap: buildRotor(2, charsToMap)
    }
  ],
  reflector: {
      rotorNumber:-1,
      position:0,
      charsToMap: charsToMap,
      charecterMap: buildRotor(-1, charsToMap)
    },
  charactersToMap:charsToMap,
  offsets:[0,0]
  
}
console.log()

function App() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  
  const [rotorSelection, setRotorSelection] = useState(defaultRotorArray)

  const initialOffsets = rotorSelection.rotorArray.map(element => 0)
  const [rotorOffsets, setRotorOffsets] = useState(initialOffsets)

  //console.log("Offsets:" + rotorOffsets)

  const handleKeyPress = (inputChar) => {

    setInput(input + inputChar)
    setOutput(output + encodeLetter(rotorSelection,inputChar))

    //console.log("Rotors in:" + rotorOffsets)
    setRotorOffsets(stepRotorsHook2(rotorOffsets,charsToMap.length))
    //console.log("Rotors out: " + rotorOffsets)
  }

  const resetOffsets = () => {
    //console.log("Current offsets: " + rotorOffsets)
    //console.log("Initial offsets: " + initialOffsets)
    setRotorOffsets(initialOffsets)
    //console.log("New offsetsd:" + rotorOffsets)
  }

  const clearDisplay = () =>
  {
    setInput("")
    setOutput("")
  }
  //setOutput("CBA")
  
  //[switchBoard, setSwitchBoard] = useState([[""]])
  

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
              rotorArray={rotorSelection.rotorArray}
              reflector={rotorSelection.reflector}
              charactersToMap={charsToMap}
              offsets={rotorOffsets}
            />
          <div className='controlPanel bordered'>
            <h3 style = {{paddingTop:"3px"}}>Control Panel</h3>
            <div className='controlPanelButton bordered' onClick={resetOffsets}>Reset Rotors</div>
            <div className='controlPanelButton bordered'>Choose Rotors</div>
            <div className='controlPanelButton bordered' onClick={clearDisplay}>Clear Message</div> 
          </div>
        </div>
        <KeyBoard   characterRows={characterRows} handleKeyPress = {(character) =>handleKeyPress(character)}// ? Infinite loop error: Pass as an arrow function to prevent infinite rende rloop issue } 
        />
      
      </div>
      <div className='rotorSelectMenu bordered'>
        
        <div className='rotorSelectTable'>
          <div className='rotorSelectTableElement bordered'>
            <div>Rotor</div>
            <div>1</div>
          </div>
          
          <div className='rotorSelectTableElement bordered'>
            <div>Rotor Number</div>
            <div>1</div>
          </div>
          <div className='rotorSelectTableElement bordered'>
            <div>Rotor Offset</div>
            <div>2</div>
          </div>
        </div>
        <div flex><div>-</div>
        <div>+</div></div>
        

      </div>
      </header>
    </div>
  );
}

export default App;


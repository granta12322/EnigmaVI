
import './App.css';
import { Rotor, RotorProps } from './components/rotor/rotor';
import { RotorSelectMenu } from './components/controlPanel/RotorSelectMenu';
import { RotorArray } from './components/rotorArray/rotorArray';
import { encodeLetter } from './components/rotorArray/rotorArray.bl';
import {KeyBoard} from './components/keyboard/keyBoard'
import React, {useState, useEffect} from 'react'
import { stepRotorsHook2 } from './components/rotorArray/rotorArray.bl';
import {createCharacterIndexMap, stepRotor} from './components/rotor/rotor.bl'
import { getValuesOfKeyFromArray, zip } from './helpers/collections';
import { isParameter } from 'typescript';


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
      charecterMap: createCharacterIndexMap(1, charsToMap)
    },
    {
      rotorNumber:2,
      position:0,
      charsToMap: charsToMap,
      charecterMap: createCharacterIndexMap(2, charsToMap)
    }
  ],
  reflector: {
      rotorNumber:-1,
      position:0,
      charsToMap: charsToMap,
      charecterMap: createCharacterIndexMap(-1, charsToMap)
    },
  charactersToMap:charsToMap,
  offsets:[0,0]
  
}

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

  console.log("Here")
  console.log(rotorArray.offsets)


  const buildRotorArray = (rotorNumbers, initialOffsets) => {
    let charsToMap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    //.console.log("Calling " + arguments.callee.toString())
    console.log("Calling buildRotorArray")
    console.log(rotorNumbers, initialOffsets)
    let rotors = [];
     for(let rotorNumber of rotorNumbers)  {
        console.log("Building individual rotor")

        let rotorCharMap = createCharacterIndexMap(Number(rotorNumber),charsToMap)
        console.log(rotorCharMap)
        let rotor = {
          rotorNumber: rotorNumber,
          position: 0,
          charsToMap: charsToMap,
          charecterMap: rotorCharMap
        }
        rotors.push(rotor)
        console.log(rotor)
      }
    console.log("Rotors:")
    console.log(rotors)

      let rotorArray = {
        rotorArray:rotors,
        reflector:  {
          rotorNumber:-1,
          position:0,
          charsToMap: charsToMap,
          charecterMap: createCharacterIndexMap(-1, charsToMap)
        },
        charactersToMap: charsToMap,
        offsets :initialOffsets
      }
    console.log("Output of buildRotorArray:")
    console.log(rotorArray)
     setRotorArray(rotorArray)
  }

  const handleKeyPress = (inputChar) => {
    console.log("Handlign key press")
    console.log(rotorArray.rotorArray)
    setInput(input + inputChar)

    setOutput(output + encodeLetter(rotorArray,inputChar))

    setInitialOffsets(stepRotorsHook2(rotorArray.rotorOffsets,charsToMap.length))
    stepRotor()
  }


  const toggleRotorMenu = () => setRotorSelectIsOpen(! rotorSelectIsOpen)
  

  const resetOffsets = () => setInitialOffsets(initialOffsets)


  const clearDisplay = () => {setInput("");setOutput("")};

  
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
              rotorArray={rotorArray.rotorArray}
              reflector={rotorArray.reflector}
              charactersToMap={rotorArray.charactersToMap}
              offsets={rotorArray.offsets}
            />
          <div className='controlPanel bordered'>
            <h3 style = {{paddingTop:"3px"}}>Control Panel</h3>
            <div className='controlPanelButton bordered' onClick={resetOffsets}>Reset Rotors</div>
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

  
  

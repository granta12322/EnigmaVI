import React, {useEffect, useState} from 'react'
import { getValuesOfKeyFromArray, zip } from '../../helpers/collections';
import { deepCopy } from '../../helpers/math';


interface RotorSelectMenuProps {
  isOpen: number,
  rotorNumberParent?:Array<number>
  rotorInitialPositionsParent: Array<number>,
  setOffsets?: Function, 
  setRotorNumbers2?:Function 
}

export function RotorSelectMenu(rotors:RotorSelectMenuProps) {
    const defaultRotorNumber = 1
    const defaultRotorOffset = 0

    const [rotorNumbers, setRotorNumbers] = useState([defaultRotorNumber])
    const [rotorInitialPositions, setRotorInitialOffsets] = useState([defaultRotorOffset])
    //const [display,setDisplay] = useState(isOpen)
    

    const addRotor = () => {
      console.log("Adding Rotor")
      rotorNumbers.push(defaultRotorNumber)
      setRotorNumbers(rotorNumbers)

      console.log("Rotors1:" + rotorInitialPositions)
      rotorInitialPositions.push(defaultRotorOffset)
      let newRotorInitialPositions = deepCopy(rotorInitialPositions);
      console.log("Rotors2:" + rotorInitialPositions)
      setRotorInitialOffsets(newRotorInitialPositions)
    }


    const removeRotor = () => { 
      setRotorNumbers(rotorNumbers.slice(0,rotorNumbers.length-1))
      setRotorInitialOffsets(rotorInitialPositions.slice(0,rotorNumbers.length-1))
    }
      console.log("Re-rendering")
      return (
      
      <div className='rotorSelectMenu bordered'>
          {zip(rotorNumbers,rotorInitialPositions).map( (rotor:Array<number>) => {
            return(<RotorSelectTableRow rotorNumber = {rotor[0]} rotorOffset  = {rotor[1]} />)
            })
          }
      <div>
        <div onClick={removeRotor}>-</div>
        <div onClick={addRotor}>+</div>
      </div>
    </div>
      )
    
    
}
  


interface RotorSelectTableRow {
    rotorNumber: number,
    rotorOffset: number
}

  function RotorSelectTableRow(rotor:RotorSelectTableRow) {
  return(
    <div className='rotorSelectTable'>
        <div className='rotorSelectTableElement bordered'>
          <div>Rotor</div>
          <div>1</div>
        </div>
        
        <div className='rotorSelectTableElement bordered'>
          <div>Rotor Number</div>
          <div>{rotor.rotorNumber}</div>
        </div>
        <div className='rotorSelectTableElement bordered'>
          <div>Rotor Offset</div>
          <div>{rotor.rotorOffset}</div>
        </div>
    </div>
      )
  }
import React, {useEffect, useState} from 'react'
import { getValuesOfKeyFromArray, zip } from '../../helpers/collections';
import { deepCopy } from '../../helpers/math';



interface RotorSelectMenuProps {
  rotorNumberParent:Array<number>
  rotorInitialPositionsParent: Array<number>,
  buildRotorArray: Function
}


export function RotorSelectMenu(rotors:RotorSelectMenuProps) {
    const defaultRotorNumber = 1
    const defaultRotorOffset = 0

    const [rotorNumbers, setRotorNumbers] = useState([defaultRotorNumber])
    const [rotorInitialPositions, setRotorInitialOffsets] = useState([defaultRotorOffset])
    //const [display,setDisplay] = useState(isOpen)

    let rotorCount = rotorNumbers.length;
    const maxRotorCount = 5;
    

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

    const changeRotorPosition = (rotorIndex: number, rotorNumber: number, rotorInitialPosition: number) => {
      console.log("Changing Position")
      console.log(rotorInitialPositions)
      rotorInitialPositions[rotorIndex] = rotorNumber
      let newRotorInitialPositions = deepCopy(rotorInitialPositions)
      
      setRotorInitialOffsets(newRotorInitialPositions)
      console.log(newRotorInitialPositions)
      console.log(rotorInitialPositions)
      
    }
    const changeRotorNumber = (rotorIndex: number, rotorNumber: number) => {
      setRotorNumbers(existingNumbers => {
        return [
          ...existingNumbers.slice(0,rotorIndex),
          rotorNumber,
          ...existingNumbers.slice(rotorIndex+1)
        ]

      } )}


    const submitSelection = (rotorNumber: number[], rotorOffset: number[]) => {
      //
      setRotorNumbers(rotorNumbers);
      setRotorInitialOffsets(rotorInitialPositions);
    }

    
      console.log("Re-rendering")
      return (
      
      <div className='rotorSelectMenu bordered'>
          {zip(rotorNumbers,rotorInitialPositions).map( (rotor:Array<number>, index:number) => {
            return(<RotorSelectTableRow rotorIndex = {index}   
              changeRotorNumber={changeRotorNumber} 
              changeRotorOffset = {changeRotorPosition}
              rotorNumber={rotor[0]}
              rotorOffset={rotor[1]}
              />)
            })
          }
      <div>
        {rotorCount > 1 ? <div onClick={removeRotor}>-</div> : null }
        {rotorCount < 5 ? <div onClick={addRotor}>+</div>    : null }
      </div>
      <div onClick={() => rotors.buildRotorArray(rotorNumbers, rotorInitialPositions)}>Confirm</div>
    </div>
      )
    
    
}
  


interface RotorSelectTableRow {
    rotorIndex: number,
    rotorNumber: number,
    rotorOffset: number,
    changeRotorNumber: Function,
    changeRotorOffset: Function
}

  function RotorSelectTableRow(rotor:RotorSelectTableRow) {


  return(
    <div className='rotorSelectTable'>
        <div className='rotorSelectTableElement bordered'>
          <div>Rotor</div>
          <div>{rotor.rotorIndex}</div>
        </div>
        
        <div className='rotorSelectTableElement bordered'>
          <div>Rotor Number</div>
          <input name="rotor number" value ={rotor.rotorNumber} type="number" onChange={(e) =>rotor.changeRotorNumber(rotor.rotorIndex,e.target.value)}/>
        </div>
        <div className='rotorSelectTableElement bordered'>
          <div>Rotor Offset</div>
          <input name="rotor offset" value ={rotor.rotorOffset} type="number" onChange={(e) =>rotor.changeRotorOffset(rotor.rotorIndex,e.target.value)}/>

        </div>
    </div>
      )
  }
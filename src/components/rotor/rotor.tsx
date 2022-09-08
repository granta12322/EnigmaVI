import React, {useState} from 'react'
import * as rotorbl  from './rotor.bl'


type RotorProp =  {
    rotorNumber: number,
    initialOffset: number,
    charactersToMap: Array<string>
}

export function Rotor({rotorNumber, initialOffset, charactersToMap}: RotorProp) {
    const [letterIndexMap, setLetterIndexMap] = useState([[0],[0]])
    const [position, setPosition] = useState(0)

    const buildRotor = (rotorNumber: number, charactersToMap: Array<string>) => {
        setLetterIndexMap(rotorbl.createCharacterIndexMap(rotorNumber, charactersToMap))
    }

    const stepRotor = () => {
        setPosition( rotorbl.stepRotor(position, charactersToMap))
    }

    const resetRotor = () => {
        setPosition()
    }
    
    return(
        <table>
            {letterIndexMap.map( (letterIndexPair: Array<number>, index: number) => 
                <tr key = {index}>
                    <td key = {index as unknown as string + '_0'}>{letterIndexPair[0]}</td>
                    <td key = {index as unknown as string + '_1'}>{letterIndexPair[1]}</td>
                </tr>
                )
            }
        </table>
    )
}


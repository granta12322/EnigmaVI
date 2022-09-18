import React, {useState} from 'react'
import * as rotorbl  from './rotor.bl'
import {mod} from '../../helpers/math'

export interface RotorProps {
    rotorNumber: number,
    position: number,
    charactersToMap: Array<string>
}



export function Rotor(rotor: RotorProps) {
    const [letterIndexMap, setLetterIndexMap] = useState([[0,0]])
    const [offset, setOffset] = useState(0)
    
    

    const buildRotor = (rotorNumber: number, charactersToMap: Array<string>) => {
        setLetterIndexMap(rotorbl.createCharacterIndexMap(rotorNumber, charactersToMap))
    }

    const encodeLetter = (signal: number, isFirstPass: boolean): number  => {
        const LETTER_COUNT: number = rotor.charactersToMap.length;
        const LEFT_LETTER_POSITION: number = 0;
        const RIGHT_LETTER_POSITION: number = 1;

        // Figure out what letter is in the current signal position
        let inputIndex: number = mod(signal - offset - rotor.position,LETTER_COUNT);
        let letterPair: Array<number> = letterIndexMap[inputIndex];

        let indexDelta: number = letterPair[LEFT_LETTER_POSITION] - letterPair[RIGHT_LETTER_POSITION];
        indexDelta = isFirstPass ? indexDelta : - indexDelta;  // index delta mirrored in reverse direction.


        let outputSignal: number = mod(
                                        mod(signal, LETTER_COUNT) + indexDelta 
                                        , LETTER_COUNT
                                        );     // !!! This is potentially wrong. Should write some tests to assert this is correct.
    return outputSignal;
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


import React, {useState} from 'react'
import * as rotorbl  from './rotor.bl'
import {mod} from '../../helpers/math'
import { positionToChar } from '../../helpers/misc'
import { reindexArray } from '../../helpers/collections'
export interface RotorProps {
    rotorNumber: number,
    position: number,
    charactersToMap: Array<string>,
    charecterMap: Array<Array<number>>
    stepRotor: Function
}

export const buildRotor = (rotorNumber: number, charactersToMap: Array<string>) => {
    return rotorbl.createCharacterIndexMap(rotorNumber, charactersToMap)
}

export function Rotor(rotor: RotorProps) {
    const [letterIndexMap, setLetterIndexMap] = useState([[0,0]])
    const [offset, setOffset] = useState(0)
    
    console.log(rotor.position)
    console.log(rotor.charecterMap[0])
    console.log(reindexArray(rotor.charecterMap[0],rotor.position))
    const buildRotor = (rotorNumber: number, charactersToMap: Array<string>) => {
        setLetterIndexMap(rotorbl.createCharacterIndexMap(rotorNumber, charactersToMap))
    }

    const stepRotor = (setOffset: Function, stepSize: number = 1,rotorSize: number) => {
        //console.log("Stepping rotor -------------------------" )
        console.log("Initial: " + offset)
        setOffset((offset + stepSize) % rotorSize -1)
        console.log("Final: " + offset)
    }

    const encodeLetter = (signal: number, rotorPosition: number, isFirstPass: boolean): number  => {
        const LETTER_COUNT: number = rotor.charactersToMap.length;
        const LEFT_LETTER_POSITION: number = 0;
        const RIGHT_LETTER_POSITION: number = 1;

        // Figure out what letter is in the current signal position
        let inputIndex: number = mod(signal - offset - rotorPosition,LETTER_COUNT);
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
        <table className='rotor'>
            <th>{rotor.position}</th>
            {reindexArray(rotor.charecterMap[0],rotor.position).map( (letterIndexPair: number, index: number) => {
                console.log("LetterIndex Pair:" + letterIndexPair)
                return(
                <tr key = {index}>
                    <td key = {index as unknown as string + '_0'}>{(index + rotor.position) % rotor.charecterMap[0].length}</td>
                </tr>
                )
            })
            }
        </table>
    )
}


import React, {useState} from 'react'
import * as rotorbl  from './rotor.bl'
import {mod} from '../../helpers/math'
import { positionToChar } from '../../helpers/misc'
import { reindexArray } from '../../helpers/collections'
export interface RotorProps {
    rotorNumber: number,
    position: number,
    charactersToMap: Array<string>,
    charecterMap: Array<number>,
    stepRotor: Function,
    index: number
}

export const buildRotor = (rotorNumber: number, charactersToMap: Array<string>) => {
    return rotorbl.createCharacterIndexMap(rotorNumber, charactersToMap)
}

export function Rotor(rotor: RotorProps) {
    const [letterIndexMap, setLetterIndexMap] = useState([[0,0]])
    const [offset, setOffset] = useState(0)
    
    //console.log(rotor.position)
    //console.log(rotor.charecterMap[0])
    //console.log(reindexArray(rotor.charecterMap[0],rotor.position))
    const  rotorSegmentsToShow: number  = 6
    
    return(
        <table className='rotor'>
            <th>{rotor.index}</th>
            {reindexArray(rotor.charecterMap,rotor.position).slice(0,rotorSegmentsToShow).map( (letterIndexPair: number, index: number) => {
                //console.log("LetterIndex Pair:" + letterIndexPair)
                return(
                <tr key = {index}>
                    <td key = {index as unknown as string + '_0'}>{(index + rotor.position) % rotor.charecterMap.length}</td>
                </tr>
                )
            })
            }
        </table>
    )
}


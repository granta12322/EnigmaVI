import React, {useState} from 'react'
import * as rotorbl  from './rotor.bl'
import {mod} from '../../helpers/math'
import { positionToChar } from '../../helpers/misc'
import { reindexArray } from '../../helpers/collections'

export interface RotorProps {
    characterMap: Array<number>,
    position: number,
    offset: number
}

export const buildRotor = (rotorNumber: number, charactersToMap: Array<string>) => {
    return rotorbl.createCharacterIndexMap(rotorNumber, charactersToMap)
}

export function Rotor(props: RotorProps) {

    const  rotorSegmentsToShow: number  = 6
    return(
<>
            {reindexArray(props.characterMap,props.position).slice(0,rotorSegmentsToShow).map( (letterIndexPair: number, index: number) => {
                return(
                <tr key = {index}>
                    <td key = {index as unknown as string + '_0'}>{(index + props.position) % props.characterMap.length}</td>
                </tr>
                )
            })
            }
            </>
    )
}


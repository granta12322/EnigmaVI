import { render } from "@testing-library/react";
import React, {useState} from "react";
import { getValuesOfKeyFromArray } from "../../helpers/collections";
import { Rotor, RotorProps } from "../rotor/rotor";
import { stepRotorsHook } from "./rotorArray.bl";




// !!! To do: learn how generics work so I can write this as 
export interface RotorArray {
    rotorArray: Array<RotorProps>;
}



export function RotorArray({rotorArray}: RotorArray ) {
    /**
     * Offset: How many steps a rotor has moved from its initial position
     * Position: Where a rotor starts out - remains constant. The real position of a rotor is its position + offset
     * signal: The location in space of of the signal. 
     *              If the input letter is A and htere is an offset of 2 then the signal travels through position 2.
     *              By contrast index referes to the position within the alphabet.
     * 
     */
    const initialOffsets: Array<0> = rotorArray.map(element => 0)
    const [rotorOffsets, setRotorOffsets] = useState(initialOffsets)
    
    const resetRotor = () => {
        setRotorOffsets(initialOffsets)
    }

    function stepRotors() {
        stepRotorsHook(rotorOffsets,rotorArray[0].charactersToMap.length) // Should be from the RotorArray
    }
    return (
        <>
        {rotorArray.map((rotor) => 
        <>
            <Rotor rotorNumber={rotor.rotorNumber} 
                    position={rotor.position}
                    charactersToMap={rotor.charactersToMap}
            />
            <Rotor {...rotor}   // !!! Deserialise like this
            />
            
        </>
        )}
        </>
        );
}
import { render } from "@testing-library/react";
import React, {useState} from "react";
import { getValuesOfKeyFromArray } from "../../helpers/collections";
import { Rotor, RotorProps } from "../rotor/rotor";
import  "./rotorArray.css";
//import { stepRotorsHook } from "./rotorArray.bl";




// !!! To do: learn how generics work so I can write this as 
export interface RotorArrayProps {
    rotorArray: Array<RotorProps>;
    reflector: RotorProps;
    charactersToMap: Array<string>;
    stepRotorsHook: Function
    offset: Array<nu
}



export function RotorArray({rotorArray}: RotorArrayProps ) {
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

    const stepRotorsHook = (rotors: Array<RotorProps>, rotorSize: number): void => {
        const stepSize: number = 1;
        for(let rotor of rotors) {
            rotor.stepRotor()
            if (rotor.position != 0) break;  // Rotate next rotor only when start of preceeding is reached.
        };
    };
    return (
        <div className="rotorArray bordered">
        {rotorArray.map((rotor) => 
        
            <Rotor {...rotor}   // !!! Deserialise like this
            />
            
        
        )}
        </div>
        );
}
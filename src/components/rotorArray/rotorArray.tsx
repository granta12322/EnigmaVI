
import { render } from "@testing-library/react";
import React, {useState} from "react";
import { getValuesOfKeyFromArray } from "../../helpers/collections";
import { Rotor, RotorProps } from "../rotor/rotor";
import { zip } from "../../helpers/collections";
import  "./rotorArray.css";
//import { stepRotorsHook } from "./rotorArray.bl";




// !!! To do: learn how generics work so I can write this as 
export interface RotorArrayProps {
    rotorArray: Array<RotorProps>;
    reflector: RotorProps;
    charactersToMap: Array<string>;
    stepRotorsHook: Function;
    offsets: Array<number>
}



export function RotorArray({rotorArray, offsets}: RotorArrayProps ) {
    /**
     * Offset: How many steps a rotor has moved from its initial position
     * Position: Where a rotor starts out - remains constant. The real position of a rotor is its position + offset
     * signal: The location in space of of the signal. 
     *              If the input letter is A and htere is an offset of 2 then the signal travels through position 2.
     *              By contrast index referes to the position within the alphabet.
     * 
     */

    //const initialOffsets: Array<0> = rotorArray.offsets.map(element => 0)
    //const [rotorOffsets, setRotorOffsets] = useState(rotorArray.offsets)
    
    
    //<Rotor {...rotor} />  // ? Deserialise props like this
    console.log("Rendering Rotor Array")
    console.log(offsets)
    let rotorsAndOffsets = zip(rotorArray,offsets)
    return (

        <table className='rotor'>
            
        {rotorsAndOffsets.map((rotor:Array<any>, index: number) => {
            //console.log("RAO:" + rotor[0]["position"])
            //console.log(rotor[1].toString())
        rotor[0]["position"] = rotor[1]

        return (<><th>{index}</th><Rotor  {...rotor[0]}/></>)

    })}
        </table>
        );
    }

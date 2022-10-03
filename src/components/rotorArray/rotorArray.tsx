
import { render } from "@testing-library/react";
import React, {useState} from "react";
import { getValuesOfKeyFromArray } from "../../helpers/collections";
import { Rotor, RotorProps } from "../rotor/rotor";
import { zip } from "../../helpers/collections";
import  "./rotorArray.css";
//import { stepRotorsHook } from "./rotorArray.bl";




// !!! To do: learn how generics work so I can write this as 




export function RotorArray(props: RotorProps[] ) {
    /**
     * Position: How many steps a rotor has moved from its initial position
     * Offset: Where a rotor starts out - remains constant. The real position of a rotor is its position + offset
     * signal: The location in space of of the signal. 
     *              If the input letter is A and htere is an offset of 2 then the signal travels through position 2.
     *              By contrast index referes to the position within the alphabet.
     * 
     */

    //const initialOffsets: Array<0> = props.offsets.map(element => 0)
    //const [rotorOffsets, setRotorOffsets] = useState(props.offsets)
    
    
    //<Rotor {...rotor} />  // ? Deserialise props like this


    return (
        <div className="rotorArray bordered">
                
            <table className="rotorArray">
            
                {//@ts-ignore
                props.rotorArray.map((rotor: RotorProps, index: number) => {
                    //console.log(rotor[1].toString())
                

                    return (<><th className="rotor">{index}<Rotor  {...rotor}/></th></>)
                })
            }
            </table>
        </div>        
        );
    }

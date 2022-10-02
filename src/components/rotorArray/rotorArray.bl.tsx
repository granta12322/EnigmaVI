import { charToPosition, positionToChar } from "../../helpers/misc";
import { RotorProps } from "../rotor/rotor";
import { propogateSignal, stepRotor } from "../rotor/rotor.bl";
import { RotorArray, RotorArrayProps } from "./rotorArray";
import {mod } from "../../helpers/math";


    /**
     * @desc When a rotor makes one full rotation the next rotor's offset is incremented
     * by one. The first rotor is rotated after every key stroke.
     */
export const stepRotorsHook2 = (offsets: Array<number>, rotorSize: number): Array<number> => {
        const stepSize: number = 1

        //console.log("Off in" + offsets)
        let newOffsets: Array<number> =  [];


        let testArray = [1,2,3]

        // ? Modifying array elements in place
        try {
        offsets.forEach((offset,index,array) =>{
            //@ts-ignore
            array[index] = stepRotor(offset,stepSize,rotorSize) 
            //console.log("Stepping")
            //console.log(stepRotor(offset,stepSize,rotorSize) )
            if (offset != 0) { throw "exception" ;}  // Rotate next rotor only when start of preceeding is reached.
        })
    } catch {}

        //console.log("Rotors out:")
        //console.log(offsets)

        return offsets;
    };

export function resetRotorArray(currentOffsets: Array<number>): Array<number> {
    return currentOffsets.map((element) => element =  0)
}


export function encodeLetter(rotorArray: RotorArrayProps, inputLetter: string) {
    //convert letter to index
    let inputSignal: number = charToPosition(inputLetter)
    //PAss index through each rotor
    console.log("Begin Letter Encoding ---------------------------------")

    let signalAfterFirstPass: number = performEncryptionPass(rotorArray.rotorArray,inputSignal,true);   
    //let signalAfterReflector: number = performEncryptionPass([rotorArray.reflector],signalAfterFirstPass,true)

    let reflector = {
        0: 1,
        1: 0,
        2: 5,
        5: 2,
        3: 4,
        4: 3
    }
    const reflect = (signal: number): number =>  rotorArray.charactersToMap.length - signal

    //@ts-ignore
    let signalAfterReflector: number = reflect(signalAfterFirstPass)
    console.log("Reflector I/O: " + signalAfterFirstPass + "/" + signalAfterReflector )
    let signalAfterSecondPass: number = performEncryptionPass(rotorArray.rotorArray,signalAfterReflector,false);  
    console.log("Signals: " + inputSignal + "," + signalAfterFirstPass + "," + signalAfterReflector + "," + signalAfterSecondPass)
    return positionToChar(signalAfterSecondPass)
    

    function performEncryptionPass(rotors: Array<RotorProps>,signal: number,isFirstPass: boolean) {
        //console.log("Performing Encryption pass")
        //console.log(rotors)
        console.log(isFirstPass ? "First Pass-----------------" : "Second Pass--------------")
        console.log("Rotors:" + rotors)
        for (let rotor of isFirstPass ? rotors : rotors.slice().reverse()) {
            console.log("Character Map:" + rotor.charecterMap)
            
            signal = propogateSignal(signal, rotor.position, isFirstPass, rotor.charecterMap);
        }
        return signal
    }
    // Backpass
    
    // Convert back to letter



}
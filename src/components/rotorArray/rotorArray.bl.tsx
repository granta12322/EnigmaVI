import { charToPosition, positionToChar } from "../../helpers/misc";
import { RotorProps } from "../rotor/rotor";
import { propogateSignal, stepRotor } from "../rotor/rotor.bl";
import { RotorArray} from "./rotorArray";
import {deepCopy, mod } from "../../helpers/math";
import {getValuesOfKeyFromArray} from "../../helpers/collections"


    /**
     * @desc When a rotor makes one full rotation the next rotor's offset is incremented
     * by one. The first rotor is rotated after every key stroke.
     */
export const stepRotorsHook2 = (offsets: Array<number>, rotorSize: number): Array<number> => {
        const stepSize: number = 1

        console.log("Off in" + offsets)
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

        console.log("Off out:")
        console.log(offsets)

        return offsets;
    };

export const stepRotorsHook4 = (rotorArray: RotorProps[] ) => {
    const rotorSize: number = rotorArray[0].characterMap.length
    const stepSize: number = 1
    console.log("\nStep Rotors 4 in")
    console.log(getValuesOfKeyFromArray(rotorArray,"position"))
    try {
    rotorArray.forEach((rotor,rotorIndex,rotorArray) => {
        //@ts-ignore
        let newPosition = stepRotor(rotor.position,stepSize,rotorSize) 
        rotorArray[rotorIndex].position = newPosition
        //console.log("Stepping")
        //console.log(stepRotor(offset,stepSize,rotorSize) )
        if (newPosition != 0) { throw "exception" ;}  // Rotate next rotor only when start of preceeding is reached.
    })
    } catch {}
    console.log("\nStep Rotors 4 out")
    console.log(getValuesOfKeyFromArray(rotorArray,"position"))
}

export function resetPositions(rotors: RotorProps[]) {
    
    //console.log(rotors)
    rotors.forEach((rotor,index,rotors) =>{
        //console.log("Resetting rotor")
        rotors[index].position = 0
    })
}


export function encodeLetter(rotorArray: RotorProps[], inputLetter: string) {
    //convert letter to index
    let inputSignal: number = charToPosition(inputLetter)
    //PAss index through each rotor
    //console.log("Begin Letter Encoding ---------------------------------")
    

    let signalAfterFirstPass: number = performEncryptionPass(rotorArray,inputSignal,true);   
    //let signalAfterReflector: number = performEncryptionPass([rotorArray.reflector],signalAfterFirstPass,true)

    const reflect = (signal: number): number =>  rotorArray[0].characterMap.length - signal

    //@ts-ignore
    let signalAfterReflector: number = reflect(signalAfterFirstPass)
    //console.log("Reflector I/O: " + signalAfterFirstPass + "/" + signalAfterReflector )
    let signalAfterSecondPass: number = performEncryptionPass(rotorArray,signalAfterReflector,false);  
    //console.log("Signals: " + inputSignal + "," + signalAfterFirstPass + "," + signalAfterReflector + "," + signalAfterSecondPass)
    return positionToChar(signalAfterSecondPass)
    

    function performEncryptionPass(rotorArray: RotorProps[],signal: number,isFirstPass: boolean) {
        //console.log("Performing Encryption pass")
        //console.log(characterMaps)
        //console.log(isFirstPass ? "First Pass-----------------" : "Second Pass--------------")
        //console.log("Rotors:" + characterMaps)
        for (let rotor of isFirstPass ? rotorArray : rotorArray.slice().reverse()) {
            //console.log("Character Map:" + rotor.charecterMap)
            
            signal = propogateSignal(signal, rotor.position, isFirstPass, rotor.characterMap);
        }
        return signal
    }
    // Backpass
    
    // Convert back to letter



}
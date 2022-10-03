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

export const stepRotorsHook3 = (rotorArray: RotorProps[], rotorSize: number): RotorProps[] => {
        const stepSize: number = 1
    console.log("Checking stepRotorsHook3")
        console.log("Off in")
        console.log(rotorArray)

        // ? Modifying array elements in place
        let skipFlag: boolean = false;

        let testArray = [
            {pos:1},
            {pos:2},
            {pos:3}
        ]
        let newTestArray = rotorArray.map(rotor => {
            let newElement = {...rotor, position: stepRotor(rotor.position,stepSize,rotorSize) }
            
            return newElement
        })
        let newTestArray2 = deepCopy(newTestArray)

        let newRotors = rotorArray.map((rotor:RotorProps,index) => {

            let newRotor: any;
            if(skipFlag === false) {

                console.log("Stepping", index)
                let newPosition: number = stepRotor(rotor.position,stepSize,rotorSize)
                if (rotor.position === 0) skipFlag = true;

                newRotor = {...rotor, position: newPosition }
                console.log(newRotor)

            }
            else {
                console.log("Stepping wihtout change", index)
                console.log(rotor)
                newRotor =  {...rotor}
            }
           return newRotor 
        })

        let newTestArray3 = newRotors
        console.log("nta3")
        console.log(newRotors)
        console.log(newTestArray2)
        console.log(newTestArray3)
        return newRotors;
    };

export function resetRotorArray(currentOffsets: Array<number>): Array<number> {
    return currentOffsets.map((element) => element =  0)
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
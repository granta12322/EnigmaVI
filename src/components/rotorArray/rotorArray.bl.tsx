import { charToPosition, positionToChar } from "../../helpers/misc";
import { RotorProps } from "../rotor/rotor";
import { propogateSignal, stepRotor } from "../rotor/rotor.bl";
import { RotorArray, RotorArrayProps } from "./rotorArray";


    /**
     * @desc When a rotor makes one full rotation the next rotor's offset is incremented
     * by one. The first rotor is rotated after every key stroke.
     */
export const stepRotorsHook2 = (rotors: RotorArrayProps, rotorSize: number): RotorArrayProps => {
        const stepSize: number = 1
        //console.log("Rotors in:")
        //console.log(rotors.rotorArray)
        for(let rotor of rotors.rotorArray) {
            //console.log("")
            //console.log("Rotor number:" + rotor.rotorNumber)
            //console.log("Rotor position 1:" + rotor.position)
            rotor.position = stepRotor(rotor.position,stepSize,rotor.charecterMap[0].length)
            //console.log("Rotor position 2:" + rotor.position)
            if (rotor.position != 0) {console.log("breaking"); break;}  // Rotate next rotor only when start of preceeding is reached.
        };
        //console.log("Rotors out:")
        //console.log(rotors.rotorArray)
        return rotors;
    };

export function resetRotorArray(currentOffsets: Array<number>): Array<number> {
    return currentOffsets.map((element) => element =  0)
}

export function encodeLetter(rotorArray: RotorArrayProps, inputLetter: string) {
    //convert letter to index
    let inputSignal:number = charToPosition(inputLetter)
    //PAss index through each rotor

    let signalAfterFirstPass: number = performEncryptionPass(rotorArray.rotorArray,inputSignal,true);   
    let signalAfterReflector: number = performEncryptionPass([rotorArray.reflector],signalAfterFirstPass,true)
    let signalAfterSecondPass: number = performEncryptionPass(rotorArray.rotorArray,signalAfterReflector,false);  
    //console.log("Signals: " + inputSignal + "," + signalAfterFirstPass + "," + signalAfterReflector + "," + signalAfterSecondPass)
    return positionToChar(signalAfterSecondPass)
    

    function performEncryptionPass(rotors: Array<RotorProps>,signal: number,isFirstPass: boolean) {
        rotors = isFirstPass ? rotors : rotors.reverse()
        //console.log("Performing Encryption pass")
        //console.log(rotors)
        for (let rotor of isFirstPass ? rotors : rotors.reverse()) {
            //console.log("Signal in:" + signal)
            signal = propogateSignal(signal, rotor.position, isFirstPass, rotor.charecterMap);
            //console.log("Signal out:" + signal)
        }
        return signal
    }
    // Backpass
    
    // Convert back to letter



}
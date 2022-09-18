import {mod} from '../src/helpers/math'
import {createCharacterIndexMap} from '../src/components/rotor/rotor.bl'
const LEFT_LETTER_POSITION =  0
const RIGHT_LETTER_POSITION = 1


let charsToMap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

console.log("we")
let indexMap = createCharacterIndexMap(0,charsToMap)
//console.log(indexMap)
//propogateSignal(1,0,0,false,indexMap)

function name(signalPosition: number, reverse: boolean) {
	let rotorMapping = [2,2,-1,-3]

	let rotorOffset = 3
	let netPositionInRotor = mod(signalPosition - rotorOffset, rotorMapping.length-1)
    let outputRotorLocation = mod(netPositionInRotor + (reverse ? rotorMapping[netPositionInRotor] : - rotorMapping[netPositionInRotor]),rotorMapping.length-1)

    let toPutInMod = outputRotorLocation + rotorOffset

    let outputSignalPosition = mod(toPutInMod,rotorMapping.length-1)
	
	return outputSignalPosition
	
}

export function propogateSignal(inputPosition: number, 
    currentRotorOffset: number,
    isFirstPass: boolean, 
    rotorMapping: Array<number>
    ) {
// The calculation here is Pos_out = ((Indx_in + offset) % 26 + dIndx ) % 26 
let modSize = rotorMapping.length - 1;
let netPositionInRotor = mod(inputPosition - currentRotorOffset, modSize)
let outputRotorLocation = mod(netPositionInRotor + (isFirstPass ? - rotorMapping[netPositionInRotor] :  rotorMapping[netPositionInRotor]),modSize)
console.log("orl:"  + outputRotorLocation)
let toPutInMod = outputRotorLocation + currentRotorOffset
console.log("TPIM:"  + toPutInMod)
let outputSignalPosition = mod(toPutInMod,modSize)
console.log(outputSignalPosition)
return outputSignalPosition
};
//for(let input = 0; input < 4; input++) {console.log("Input: " + input + " Output: " + name(input, false))}
let inputSignal = 0;
let charIndexMap = createCharacterIndexMap(0,charsToMap)

let encodedSignal = propogateSignal(inputSignal,0,true,charIndexMap) 
let decodedSignal = propogateSignal(encodedSignal,0,false,charIndexMap)
console.log("Here")
console.log(encodedSignal)
console.log(decodedSignal)


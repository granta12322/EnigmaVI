import { stepRotor, createCharacterIndexMap} from '../rotor/rotor.bl'
import {stepRotorsHook, resetRotorArray, encodeLetter} from './rotorArray.bl'
let charsToMap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
charsToMap = charsToMap.slice(0,6)

test("Rotor Array resets correctly", ()=>{
    expect(resetRotorArray([13,12,11])).toEqual([0,0,0])
    expect(resetRotorArray([0,0,0])).toEqual([0,0,0])
})

test("Rotor Array steps correctly", () => {
    let rotorSize = charsToMap.length

    //@ts-ignore
    expect(stepRotorsHook([0,0,0],rotorSize)).toEqual([1,0,0])      // test basic rotation
    expect(stepRotorsHook([rotorSize-1,0,0],rotorSize)).toEqual([0,1,0])    //test ticking over next rotor.
    expect(stepRotorsHook([rotorSize-1,rotorSize-1,0],rotorSize)).toEqual([0,0,1]) // Test two rotors ticking over at once
    expect(stepRotorsHook([0,1,0],rotorSize)).toEqual([1,1,0])  // non-zero rotor staying same
    expect(stepRotorsHook([0,rotorSize-1,0],rotorSize)).toEqual([1,rotorSize-1,0])
    expect(stepRotorsHook([rotorSize-1,rotorSize-1,rotorSize-1],rotorSize)).toEqual([0,0,0])    // Final rotor at limit
})

function performEncryptionPass(rotors,signal,isFirstPass) {
    rotors = isFirstPass ? rotors : rotors.reverse()
    console.log("Performing Encryption pass")

    for (let rotor of rotors) {
        console.log("Signal in:" + signal)
        
        signal = propogateSignal(signal, rotor.position, isFirstPass, rotor.charecterMap);
        console.log("Signal out:" + signal)
    }
    return signal
}

test("Rotor Array encrypts correctly", () =>{
    let rotorArray  = { 
        rotorArray: [
            {
                rotorNumber: 0,
                position: 0,
                charactersToMap: charsToMap,
                charecterMap: createCharacterIndexMap(0,charsToMap)
            },
            {
                rotorNumber: 1,
                position: 0,
                charactersToMap: charsToMap,
                charecterMap: createCharacterIndexMap(1,charsToMap)
            },
            
            {
                rotorNumber: 2,
                position: 0,
                charactersToMap: charsToMap,
                charecterMap: createCharacterIndexMap(2,charsToMap)
            }
        ],
        reflector: {
            rotorNumber: -1,
            position: 0,
            charactersToMap: charsToMap,
            charecterMap: createCharacterIndexMap(-1,charsToMap)
        },
        charactersToMap: charsToMap
    }

    let signal = charsToMap.indexOf('b')

    let input = 4
    let output = encodeLetter(rotorArray,input)

    let outputAfterFirstPass = console.log(performEncryptionPass(rotorArray["rotorArray"][0]))
    console.log(outputAfterFirstPass)

    let decodedOutput = encodeLetter(rotorArray,output)
    console.log()
    expect(output).not.toEqual(input)
    expect(decodedOutput).toEqual(input)
})
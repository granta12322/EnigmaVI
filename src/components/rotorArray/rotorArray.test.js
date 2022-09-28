
import { stepRotor, createCharacterIndexMap} from '../rotor/rotor.bl'
import {stepRotorsHook, resetRotorArray, encodeLetter} from './rotorArray.bl'
import * as rotorbl  from '../rotor/rotor.bl'
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

    let input = "D"
    let output = encodeLetter(rotorArray,input)

    console.log("Output: " + output)

    //let outputAfterFirstPass = console.log(performEncryptionPass(rotorArray["rotorArray"][0]))
    //console.log(output)

    let decodedOutput = encodeLetter(rotorArray,output)
    console.log("Decoded: " + decodedOutput)
    console.log(decodedOutput)
    expect(output).not.toEqual(input)
    expect(decodedOutput).toEqual(input)

    rotorArray[1]
    //let inputSignal = 3
    //let encodedSignal_1 = rotorbl.propogateSignal(inputSignal,0,true,rotorArray.rotorArray[0].charecterMap) 
    //let encodedSignal_2 = rotorbl.propogateSignal(encodedSignal_1,0,true,rotorArray.rotorArray[1].charecterMap) 
//
    //let decodedSignal_1 = rotorbl.propogateSignal(encodedSignal_2,0,false,rotorArray.rotorArray[0].charecterMap) 
    //let decodedSignal_2 = rotorbl.propogateSignal(decodedSignal_1,0,false,rotorArray.rotorArray[1].charecterMap) 
    //console.log("Signals:")
    //console.log(encodedSignal_1)
    //console.log(encodedSignal_2)
    //console.log(decodedSignal_1)
    //console.log(decodedSignal_2)


})


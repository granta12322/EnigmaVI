import { stepRotor } from '../rotor/rotor.bl'
import {stepRotorsHook} from './rotorArray.bl'
let charsToMap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']


test("Rotor Array resets correctly", ()=>{
    
})

test("Rotor Array steps correctly", () => {
    let rotorSize = charsToMap.length

    //@ts-ignore
    console.log("Hello", stepRotorsHook([0,0,0],rotorSize))
    expect(stepRotorsHook([0,0,0],rotorSize)).toEqual([1,0,0])      // test basic rotation
    expect(stepRotorsHook([rotorSize-1,0,0],rotorSize)).toEqual([0,1,0])    //test ticking over next rotor.
    expect(stepRotorsHook([rotorSize-1,rotorSize-1,0],rotorSize)).toEqual([0,0,1]) // Test two rotors ticking over at once
    expect(stepRotorsHook([0,1,0],rotorSize)).toEqual([1,1,0])  // non-zero rotor staying same
    expect(stepRotorsHook([0,0,rotorSize-1],rotorSize)).toEqual([1,0,0])    // Final rotor at limit
    
})

test("Rotor Array encrypts correctly", () =>{

})
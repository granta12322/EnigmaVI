import { render } from "@testing-library/react";
import { AssertionError } from "assert";
import { randomInt } from "crypto";
import { Rotor } from "./rotor"
import * as rotorbl  from './rotor.bl'

let charsToMap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

test("Consistent rotor creation", () => {
    
    
    expect(
        rotorbl.createCharacterIndexMap(1,charsToMap))
        .toEqual(rotorbl.createCharacterIndexMap(1,charsToMap)
    )

})

test("Rotors not created the same for different index", () => {
    let testCount = 20
    for (let i = 0; i < testCount; i++)
    expect( 
        rotorbl.createCharacterIndexMap(0,charsToMap))
        .not.toEqual(rotorbl.createCharacterIndexMap(1,charsToMap)
    )
})

test("Rotor resets correctly", () =>{
    
    render(<Rotor rotorNumber={1} initialOffsets={0} charactersToMap = {charsToMap}></Rotor>)
    
})

test("Rotor rotation",() => {
    expect(rotorbl.stepRotor(0,1,charsToMap)).toEqual(1) // test increase 
    expect(rotorbl.stepRotor(charsToMap.length-1,1,charsToMap)).toEqual(0) // test end of rotor case
    
})

test("Test correct rotor encryption",() => {
    let inputSignal;
    let charIndexMap = rotorbl.createCharacterIndexMap(0,charsToMap)
    let encodedSignal;
    let decodedSignal;


    for(inputSignal = 0; inputSignal < charsToMap.length /2; inputSignal ++ ){
        for(let rotorOffset = 0; rotorOffset < charsToMap.length / 2; rotorOffset++) {
            //console.log("Testing: " + inputSignal + " "+ rotorOffset)
            encodedSignal = rotorbl.propogateSignal(inputSignal,rotorOffset,true,charIndexMap) 
            decodedSignal = rotorbl.propogateSignal(encodedSignal,rotorOffset,false,charIndexMap)
            console.log(inputSignal +","+ encodedSignal+ "," + decodedSignal)
            expect(inputSignal).not.toEqual(encodedSignal);
            expect(decodedSignal).toEqual(inputSignal);
        }
    }

    
})
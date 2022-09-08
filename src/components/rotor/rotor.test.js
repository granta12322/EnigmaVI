import { render } from "@testing-library/react";
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

    
})

//test("Test correct rotor encryption",{

//})
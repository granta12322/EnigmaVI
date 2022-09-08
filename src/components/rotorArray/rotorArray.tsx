import { Rotor } from "../rotor/rotor"

interface RotorArrayProp {
    rotors: Array<Array<number>>,
    charactersToMap: Array<string>
}

export function RotorArray({rotors, charactersToMap}: RotorArrayProp) {

    const encryptCharacter = (character: string) => {

    }

    const resetRotors = () => {

    }

    

    return(
        <div>
            {rotors.map( (rotor: Array<number>) =>
            <Rotor rotorNumber = {rotor[0]} initialOffset = {rotor[1]} charactersToMap = {charactersToMap}/>
            )}   
        </div>
    )
}
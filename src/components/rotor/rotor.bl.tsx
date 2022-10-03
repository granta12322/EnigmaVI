import { deepCopy, randIntBetween, mod } from "../../helpers/math";

const LEFT_LETTER_POSITION: number = 0;
const RIGHT_LETTER_POSITION: number = 1;



export function createCharacterIndexMap(rotorNumber: number, characters: Array<string>): Array<number> {

    const letterCount: number = characters.length;
    const inputLetterIndexes: Array<number> = [...Array(letterCount).keys()];
    let availableOutputs: Array<number> = deepCopy(inputLetterIndexes);
    
    let randomSeed: number = rotorNumber * 1000;
    let letterMapping: Array<number> =[];
    let alreadyChosenIndexes: Array<number> = [];
    
    let i: number = 0;
    //console.log("Creating Rotor Map")
    for (let i: number = 0; i < letterCount; i++) {   
        //@ts-ignore
        let outputIndex = selectIndexPair(i, availableOutputs) ;
        //@ts-ignore
        //console.log("Inde: " + outputIndex);
        letterMapping[i] = outputIndex;
        alreadyChosenIndexes.push(outputIndex);
        delete availableOutputs[outputIndex];
    };



    
     
    //console.log("Charmap:" + letterMapping)
    //console.log("Charmap sum: " + letterMapping.reduce((partialSum,a) => partialSum + a))


    function selectIndexPair(inputIndex: number, availableOutputs: Array<number>) {
        let availableOutputCount = availableOutputs.length;  // !!! Can improve the way this is written, Something something set difference between all letters and those chosen.
        let outputIndex;

        // Ensure no outputIndex duplicates.
        let max = availableOutputCount - 1;
        let min = 0;
        do { 
            outputIndex = randIntBetween(randomSeed, min, max);
            randomSeed++;
        } while(
            alreadyChosenIndexes.includes(outputIndex) 
            || inputIndex === outputIndex
        );
        return outputIndex;
    };

    return letterMapping;

    

};

 const printArray = (array: Array<Array<number>>)=> array.map((element) => console.log(element))

export function createCharacterIndexMapBackUp(rotorNumber: number, characters: Array<string>): Array<number> {

    const letterCount: number = characters.length;
    const inputLetterIndexes: Array<number> = [...Array(letterCount).keys()];
    let availableOutputs: Array<number> = deepCopy(inputLetterIndexes);
    
    let randomSeed: number = rotorNumber * 1000;
    let letterMapping: Array<number> =[];
    let alreadyChosenIndexes: Array<number> = [];
    
    let i: number = 0;
    for (let i: number = 0; i < letterCount; i++) {   
        //@ts-ignore
        let outputIndex = selectIndexPair(i, availableOutputs) ;
        //@ts-ignore
        letterMapping[i] = outputIndex;
        alreadyChosenIndexes.push(outputIndex);
        delete availableOutputs[outputIndex];
    };
    //console.log("Charmap:" + letterMapping)
    //console.log("Charmap sum: " + letterMapping.reduce((partialSum,a) => partialSum + a))


    function selectIndexPair(inputIndex: number, availableOutputs: Array<number>) {
        let availableOutputCount = availableOutputs.length;  // !!! Can improve the way this is written, Something something set difference between all letters and those chosen.
        let outputIndex;

        // Ensure no outputIndex duplicates.
        let max = availableOutputCount - 1;
        let min = 0;
        do { 
            outputIndex = randIntBetween(randomSeed, min, max);
            randomSeed++;
        } while(
            alreadyChosenIndexes.includes(outputIndex) 
            || inputIndex === outputIndex
        );
        return outputIndex;
    };

    return letterMapping;

    

};

export function stepRotor(position: number, stepSize: number = 1, rotorSize: number): number  {
    //console.log(position + stepSize)
    //console.log("step result:" + ((position + stepSize) % (rotorSize -1)))
    return (position + stepSize) % (rotorSize -1)
}

export function resetRotor(currentRotorOffset: number) {
    currentRotorOffset = 0;
}
    

export function propogateSignal(inputPosition: number, 
                                currentRotorOffset: number,
                                isFirstPass: boolean, 
                                rotorMapping: Array<number>
                                ) {
  

                                    
    // The calculation here is Pos_out = ((Indx_in + offset) % 26 + dIndx ) % 26 
    let modSize = rotorMapping.length;  
    
    
    //console.log("Rotor Map 2 : " + rotorMapping)
    //console.log("Rotor char map:" + rotorMapping)
    let netPositionInRotor = mod(inputPosition - currentRotorOffset, modSize)

    
    let outputIndex = isFirstPass ? rotorMapping[netPositionInRotor] : rotorMapping.indexOf(netPositionInRotor)
    // console.log("NPR: " + netPositionInRotor )
    // console.log("F/B: " + rotorMapping[netPositionInRotor]+ "/" + rotorMapping.indexOf(netPositionInRotor))
    
    // console.log("I/O: " + inputPosition + "/" + outputIndex);
    // console.log("")
    //console.log("Subtracting: "+positionChange)
    let outputRotorLocation = outputIndex

    let outputSignalPosition = mod(outputRotorLocation + currentRotorOffset,modSize)
    
    
    //console.log("inputPos:" + inputPosition)
    //console.log("npir:" + netPositionInRotor)
    //console.log("rm" + passRotorMap)
    //console.log("pc" + positionChange)
    //console.log("orl:"  + outputRotorLocation)
    //console.log(outputSignalPosition)
    return outputSignalPosition
};

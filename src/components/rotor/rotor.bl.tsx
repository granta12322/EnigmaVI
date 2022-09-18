import { deepCopy, randIntBetween, mod } from "../../helpers/math";

const LEFT_LETTER_POSITION: number = 0;
const RIGHT_LETTER_POSITION: number = 1;

export function createCharacterIndexMap(rotorNumber: number, characters: Array<string>): Array<Array<number>> {

    const letterCount: number = characters.length;
    const inputLetterIndexes: Array<number> = [...Array(letterCount).keys()];
    let availableOutputs: Array<number> = deepCopy(inputLetterIndexes);
    
    let randomSeed: number = rotorNumber * 1000;
    let letterMapping: Array<Array<number>> =[[]];
    let alreadyChosenIndexes: Array<number> = [];
    
    let i: number = 0;
    for (let i: number = 0; i < letterCount; i++) {   
        //@ts-ignore
        let outputIndex = selectIndexPair(i, availableOutputs) ;
        //@ts-ignore
        letterMapping[i] = [i,outputIndex];
        alreadyChosenIndexes.push(outputIndex);
        delete availableOutputs[outputIndex];
    };



    let forwardPassDelta = letterMapping.map((letterMap,i) => letterMap[1] - letterMap[0]) 
    
    //console.log("Forward Pass LM: ")
    //printArray(letterMapping)
    //console.log("Backward pass LM: ")
    let letterMapBackPAss = letterMapping.sort((a,b) => a[1] - b[1])
    //printArray(letterMapBackPAss)
    let backwardPassDelta =  letterMapBackPAss.map((letterMap,i) => letterMap[0] - letterMap[1]) 
    //console.log("Forward PAss Deltas: " + forwardPassDelta)
    //console.log("Back pass delta: " + backwardPassDelta)

    letterMapping = [forwardPassDelta,backwardPassDelta]
     
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
        letterMapping[i] = outputIndex - i;
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

export function stepRotor(position: number, stepSize: number = 1, charactersToMap: Array<string>): number  {
    return (position + stepSize) % charactersToMap.length -1
}

export function resetRotor(currentRotorOffset: number) {
    currentRotorOffset = 0;
}
    

export function propogateSignal(inputPosition: number, 
                                currentRotorOffset: number,
                                isFirstPass: boolean, 
                                rotorMapping: Array<Array<number>>
                                ) {
    // The calculation here is Pos_out = ((Indx_in + offset) % 26 + dIndx ) % 26 
    let modSize = rotorMapping[0].length;

    let passRotorMap = isFirstPass ? rotorMapping[0] : rotorMapping[1]
    
    let netPositionInRotor = mod(inputPosition - currentRotorOffset, modSize)
    //console.log("Here:" + (inputPosition - currentRotorOffset))
    //console.log("There:" + mod(inputPosition - currentRotorOffset,modSize) )
    let positionChange  = passRotorMap[netPositionInRotor]

    let outputRotorLocation = mod(netPositionInRotor + positionChange,modSize)
    

    let outputSignalPosition = mod(outputRotorLocation + currentRotorOffset,modSize)
    
    
    //console.log("inputPos:" + inputPosition)
    //console.log("npir:" + netPositionInRotor)
    //console.log("rm" + passRotorMap)
    //console.log("pc" + positionChange)
    //console.log("orl:"  + outputRotorLocation)
    //console.log(outputSignalPosition)
    return outputSignalPosition
	return outputSignalPosition
};

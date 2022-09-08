
function random(randSeed: number): number {
    let x = Math.sin(randSeed) * 10000;
    return x - Math.floor(x);
}

function deepCopy(object: any): any {
    return JSON.parse(JSON.stringify(object))
}

function randIntBetween(seed: number, min: number, max:number) {
    return Math.floor(random(seed) * (max - min + 1) + min)
};


export function createCharacterIndexMap(rotorNumber: number, characters: Array<string>): Array<Array<number>> {

    const letterCount: number = characters.length;
    const inputLetterIndexes: Array<number> = [...Array(letterCount).keys()];
    let availableOutputs: Array<number> = deepCopy(inputLetterIndexes);
    
    let randomSeed: number = rotorNumber * 1000;
    let inputIndex: number;
    let letterMapping: Array<Array<number>> =[[]];
    let alreadyChosenIndexes: Array<number> = [];
    
    for (inputIndex = 0; inputIndex < letterCount; inputIndex++) {   
        let outputIndex = selectIndexPair(inputIndex, availableOutputs) ;
        let letterPair: Array<number> = [inputIndex,outputIndex];
        letterMapping[inputIndex] = letterPair;

        alreadyChosenIndexes.push(outputIndex);
        delete availableOutputs[outputIndex];
    };



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

export function stepRotor(position: number, charactersToMap: Array<string>): number  {
    return (position + 1) % charactersToMap.length 
}

export function resetRotor()
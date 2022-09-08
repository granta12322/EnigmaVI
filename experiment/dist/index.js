"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCharacterIndexMap = void 0;
function random(randSeed) {
    let x = Math.sin(randSeed) * 10000;
    return x - Math.floor(x);
}
function deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
}
function randIntBetween(seed, min, max) {
    return Math.floor(random(seed) * (max - min + 1) + min);
}
;
function createCharacterIndexMap(rotorNumber, characters) {
    const letterCount = characters.length;
    const inputLetterIndexes = [...Array(letterCount).keys()];
    let availableOutputs = deepCopy(inputLetterIndexes);
    let randomSeed = rotorNumber * 1000;
    let inputIndex;
    let letterMapping = [[]];
    let alreadyChosenIndexes = [];
    for (inputIndex = 0; inputIndex < letterCount; inputIndex++) {
        let outputIndex = selectIndexPair(inputIndex, availableOutputs);
        let letterPair = [inputIndex, outputIndex];
        letterMapping[inputIndex] = letterPair;
        alreadyChosenIndexes.push(outputIndex);
        delete availableOutputs[outputIndex];
    }
    ;
    function selectIndexPair(inputIndex, availableOutputs) {
        let availableOutputCount = availableOutputs.length; // !!! Can improve the way this is written, Something something set difference between all letters and those chosen.
        let outputIndex;
        // Ensure no outputIndex duplicates.
        let max = availableOutputCount - 1;
        let min = 0;
        do {
            outputIndex = randIntBetween(randomSeed, min, max);
            randomSeed++;
        } while (alreadyChosenIndexes.includes(outputIndex)
            || inputIndex === outputIndex);
        return outputIndex;
    }
    ;
    return letterMapping;
}
exports.createCharacterIndexMap = createCharacterIndexMap;
;
console.log(createCharacterIndexMap(1, ['A', 'B', 'C', 'D', 'E', 'F']));
//# sourceMappingURL=index.js.map
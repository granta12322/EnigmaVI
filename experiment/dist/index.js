const { Console } = require("console")


function reindexArray(array,indexChange)  {
    let newArray = [];

    for(let i=0; i<array.length; i++) {
        let newIndex = (i + indexChange) % (array.length - 1);
        newArray[newIndex] = array[i]
    }
    return newArray
    
}

console.log(reindexArray([1,2,3,4],1))

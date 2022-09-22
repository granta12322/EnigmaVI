
function reindexArray(array: Array<any>,indexChange: number)  {
    let newArray = [];

    for(let i=0; i<array.length; i++) {
        let newIndex = (i + indexChange) % (array.length);
        console.log("New index:" + newIndex)
        newArray[newIndex] = array[i]
    }
    return newArray
    
}

console.log(reindexArray([1,2,3,4],1))

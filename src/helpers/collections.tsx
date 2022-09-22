export function getValuesOfKeyFromArray(array:Array<any>, key: string): Array<any> {
    let result: Array<any> = [];
    array.map((element) => {
        console.log("element to add:" + element[key])
        result.push(element[key]) 
    }
    )
    return result
}

export function deepCopy(object: any): any {
    return JSON.parse(JSON.stringify(object));
}



export function reindexArray(array: Array<any>,indexChange: number)  {
    let newArray = [];

    for(let i=0; i<array.length; i++) {
        let newIndex = (i + indexChange) % (array.length);
        newArray[newIndex] = array[i]
    }
    return newArray
}
export function toggleInArray<T>(arr: Array<T>, e: T): Array<T> {
    const vFoundIndex = arr.indexOf(e);
    if(vFoundIndex === -1) {
        arr.push(e);
    } else {
        arr.splice(vFoundIndex, 1);
    }

    return arr;
}

export function toggleMin<T>(arr: Array<T>, e: T) {
    let after = toggleInArray(arr, e);
    if(after.length === 1) return arr;
    return after;
}
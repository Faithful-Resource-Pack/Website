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
    const vFoundIndex = arr.indexOf(e);
    if(vFoundIndex !== -1 && arr.length === 1) return arr;

    return toggleInArray(arr, e);
}
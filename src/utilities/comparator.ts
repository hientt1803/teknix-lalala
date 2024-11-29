/**
 * The function `isEqualObjects` in TypeScript compares two objects for equality by recursively
 * checking their keys and values.
 * @param {any} obj1 - `obj1` is the first object that you want to compare for equality.
 * @param {any} obj2 - The `obj2` parameter in the `isEqualObjects` function is the second object that
 * you want to compare for equality with `obj1`. This function compares two objects deeply to check if
 * they are equal in terms of their properties and values.
 * @returns The `isEqualObjects` function is returning a boolean value (`true` or `false`) based on
 * whether the two input objects `obj1` and `obj2` are equal in terms of their keys and values.
 */
export function isEqualObjects(obj1: any, obj2: any): boolean {
    // If both are strictly equal (same reference), they are equal
    if (obj1 === obj2) {
        return true;
    }

    // If either is null or not an object, they are not equal
    if (
        obj1 === null ||
        obj2 === null ||
        typeof obj1 !== "object" ||
        typeof obj2 !== "object"
    ) {
        return false;
    }

    // Compare keys length
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Recursively compare all keys and values
    for (const key of keys1) {
        if (!keys2.includes(key) || !isEqualObjects(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

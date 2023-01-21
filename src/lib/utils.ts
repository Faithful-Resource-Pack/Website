export function toggleInArray<T>(arr: Array<T>, e: T): Array<T> {
	const vFoundIndex = arr.indexOf(e);
	if (vFoundIndex === -1) {
		arr.push(e);
	} else {
		arr.splice(vFoundIndex, 1);
	}

	return arr;
}

export function toggleMin<T>(arr: Array<T>, e: T) {
	const vFoundIndex = arr.indexOf(e);
	if (vFoundIndex !== -1 && arr.length === 1) return arr;

	return toggleInArray(arr, e);
}

/**
 * Simple object check.
 * @param {unknown} item Item to check.
 * @returns {boolean} true if item is an object
 */
export function isObject(item: unknown): boolean {
	return item !== null && item !== undefined && typeof item === "object" && !Array.isArray(item);
}

// TODO Add type declarations
export function mergeDeep(target: any, ...sources: any[]): any {
	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}

	return mergeDeep(target, ...sources);
}

export function toCamel(s: string) {
	return s.replace(/([-_][a-z])/ig, ($1) => {
		return $1.toUpperCase()
			.replace('-', '')
			.replace('_', '');
	});
};

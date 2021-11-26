import { SafeAny } from '..';

export function flatten<U>(source: U[][]): U[] {
    return (<U[]>[]).concat(...source);
}

export function update<U extends V, V>(old: U, changes: V): U {
    const result = Object.create(Object.getPrototypeOf(old));
    for (const key of Object.keys(old)) {
        result[key] = (<SafeAny>old)[key];
    }
    for (const key of Object.keys(changes)) {
        result[key] = (<SafeAny>changes)[key];
    }
    return result;
}

export function sumByKey(array: SafeAny, key: string) {
    return array.reduce((acc: number, curr: SafeAny) => acc + (curr[key] ? curr[key] : 0), 0);
}

export function convertToString(array: SafeAny[]) {
    if (!array) {
        return;
    }

    return array.join(',');
}

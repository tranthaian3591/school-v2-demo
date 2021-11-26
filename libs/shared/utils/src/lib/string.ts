export function contains(text: string, term: string): boolean {
    // return text.search(term) >= 0;
    return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
}

/**
 * "Safer" String.toLowerCase()
 */
export function lowerCase(str: string) {
    return str.toLowerCase();
}

/**
 * "Safer" String.toUpperCase()
 */
export function upperCase(str: string) {
    return str.toUpperCase();
}

/**
 * UPPERCASE first char of each word.
 */
export function properCase(str: string) {
    return lowerCase(str).replace(/^\w|\s\w/g, upperCase);
}

/**
 * UPPERCASE first char of each sentence and lowercase other chars.
 */
export function sentenceCase(str: string) {
    // Replace first char of each sentence (new line or after '.\s+') to
    // UPPERCASE
    return lowerCase(str).replace(/(^\w)|\.\s+(\w)/gm, upperCase);
}

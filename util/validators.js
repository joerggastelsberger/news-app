export function alphaNumeric(value) {
    return /^[A-Za-z0-9 ]+$/.test(value) ? true : false
}
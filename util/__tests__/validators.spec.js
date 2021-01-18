import { alphaNumeric } from '../validators.js'

describe('alphaNumeric', () => {
    test('returns true for alpha numeric values and whitespaces', () => {
        const value = 'Test11 test'
        expect(alphaNumeric(value)).toBe(true)
    })

    test('returns false for non alpha numeric values', () => {
        const value = 'Test11!test'
        expect(alphaNumeric(value)).toBe(false)
    })
})
import { dateFilter } from '../date-filter.js'

describe('date-filter.js', () => {
    test('return formatted date' ,() => {
        const date = new Date(2020, 11, 12)
        const formattedDate = dateFilter(date)
        expect(formattedDate).toBe('12. December 2020')
    })
})
import { encodeArticles, encodeSearchTerms } from '../encoders.js'

describe('encodeArticles', () => {
    test('returns articles with encoded title attached', () => {
        const headlines = {
            articles: [{ title: 'Title 1 Test' }, { title: 'Title 2 Test' }]
        }
        const encodedArticles = encodeArticles(headlines)
        expect(encodedArticles[0].encodedTitle).toBe('title-1-test')
        expect(encodedArticles[1].encodedTitle).toBe('title-2-test')
    })
})

describe('encodeSearchTerms', () => {
    test('returns encoded search terms', () => {
        const searchTerms = 'Test AND Test'
        const encodedsearchTerms = encodeSearchTerms(searchTerms)
        expect(encodedsearchTerms).toBe('test-and-test')
    })
})
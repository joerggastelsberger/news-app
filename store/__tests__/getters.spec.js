import { getters } from '../index.js'

describe('getters', () => {
    test('loadedArticles returns all articles from state.loadedArticles' , () => {
        const expectedResult = [{ title: '12' }, { title: '22' }, { title: '23'}]
        const state = {
            loadedArticles: expectedResult
        }
        const result = getters.loadedArticles(state)
        expect(result).toEqual(expectedResult)
    })

    test('loadedArticle returns loaded article from state.loadedArticle', () => {
        const expectedResult = { title: 'test title'}
        const state = {
            loadedArticle: expectedResult
        }
        const result = getters.loadedArticle(state)
        expect(result).toEqual(expectedResult)
    })

    test('category returns the category of state.category', () => {
        const expectedResult = 'TestCategory'
        const state = {
            category: expectedResult
        }
        const result = getters.category(state)
        expect(result).toEqual(expectedResult)
    })

    test('country returns the category of state.country', () => {
        const expectedResult = 'TestCountry'
        const state = {
            country: expectedResult
        }
        const result = getters.country(state)
        expect(result).toEqual('TestCountry')
    })
})
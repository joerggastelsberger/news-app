import { mutations } from '../index.js'

describe('mutations', () => {
    test('setArticles sets state.loadedArticles to articles', () => {
        const loadedArticles = [{ title: 'test title 1' }, { title: 'test title 2' }]
        const state = {
            loadedArticles: []
        }
        mutations.setArticles(state, loadedArticles)
        expect(state.loadedArticles).toBe(loadedArticles)
    })

    test('setArticle sets state.loadedArticle to article', () => {
        const loadedArticle = { title: 'test title' }
        const state = {
            loadedArticle: {}
        }
        mutations.setArticle(state, loadedArticle)
        expect(state.loadedArticle).toBe(loadedArticle)
    })

    test('setCategory sets state.category to category', () => {
        const category = 'testCategory'
        const state = {
            category: ''
        }
        mutations.setCategory(state, category)
        expect(state.category).toBe(category)
    })

    test('setCountry sets state.country to country', () => {
        const country = 'testCountry'
        const state = {
            country: ''
        }
        mutations.setCountry(state, country)
        expect(state.country).toBe(country)
    })
})
import { actions } from '../index.js'

describe('actions', () => {
    test('setArticles commits setArticles with articles', () => {
        const loadedArticles = [{ title: 'title test 1' }, { title: 'title test 2' }]
        const context = {
            commit: jest.fn()
        }
        actions.setArticles(context, loadedArticles)
        expect(context.commit).toHaveBeenCalledWith('setArticles', loadedArticles)
    })

    test('setArticle finds article in state.loadedArticles and commits setArticle with article', () => {
        const loadedArticles = [{ encodedTitle: 'title-test-1' }, { encodedTitle: 'title-test-2' }]
        const encodedTitle = loadedArticles[0].encodedTitle
        const context = {
            commit: jest.fn(),
            state: {
                loadedArticles: loadedArticles
            }
        }
        actions.setArticle(context, encodedTitle)
        expect(context.commit).toHaveBeenCalledWith('setArticle', loadedArticles[0])
    })

    test('resetCriterias commits setCategory with ""', () => {
        const context = {
            commit: jest.fn()
        }
        actions.resetCriterias(context)
        expect(context.commit).toHaveBeenCalledWith('setCategory', '')
    })

    test('resetCriterias commits setCountry with ""', () => {
        const context = {
            commit: jest.fn()
        }
        actions.resetCriterias(context)
        expect(context.commit).toHaveBeenCalledWith('setCountry', '')
    })
})
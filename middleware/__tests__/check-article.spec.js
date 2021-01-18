import checkArticle from '../check-article.js'

describe('check-article.js', () => {
    test('redirects to "/" when store.getters.loadedArticle null' ,() => {
        const context = {
            store: {
                getters: {}
            },
            redirect: jest.fn()
        }
        jest.spyOn(context, 'redirect')
        checkArticle(context)
        expect(context.redirect).toHaveBeenCalledWith('/')
    })
})
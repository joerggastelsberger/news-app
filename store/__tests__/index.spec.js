import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)
let NuxtStore
let store
const headlines = {
    articles: [
        { title: 'Title 1' },
        { title: 'Title 2' }
    ]
}
const axiosMock = {
    $get: () => { return headlines }
}

describe('actions', () => {
    beforeAll(async () => {
        const storePath = `${process.env.buildDir}/store.js`
        NuxtStore = await import(storePath)
    })

    beforeEach(async () => {
        store = await NuxtStore.createStore()
        store.$axios = axiosMock
    })

    test('setCategory commits setCategory with category', async () => {
        const category = 'testCategory'
        await store.dispatch('setCategory', category)
        expect(store.getters.category).toBe(category)
    })

    test('setCategory commits setArticles with encodedArticles', async () => {
        expect.assertions(2)
        const category = 'testCategory'
        await store.dispatch('setCategory', category)
        expect(store.getters.loadedArticles[0].encodedTitle).toBe('title-1')
        expect(store.getters.loadedArticles[1].encodedTitle).toBe('title-2')
    })

    test('setCategory commits setCountry with "us" when no country avaliable', async () => {
        expect.assertions(2)
        const country = 'testCategory'
        store.commit('setCountry', '')
        expect(store.getters.country).toBe('')
        await store.dispatch('setCategory', country)
        expect(store.getters.country).toBe('us')
    })

    test('setCountry commits setCountry with country', async () => {
        const country = 'testCountry'
        await store.dispatch('setCountry', country)
        expect(store.getters.country).toBe(country)
    })

    test('setCountry commits setCategory with "breaking-news" when no category avaliable', async () => {
        expect.assertions(2)
        const country = 'testCountry'
        store.commit('setCategory', '')
        expect(store.getters.category).toBe('')
        await store.dispatch('setCountry', country)
        expect(store.getters.category).toBe('breaking-news')
    })

    test('setCountry commits setArticles with encodedArticles', async () => {
        expect.assertions(2)
        const country = 'testCountry'
        await store.dispatch('setCountry', country)
        expect(store.getters.loadedArticles[0].encodedTitle).toBe('title-1')
        expect(store.getters.loadedArticles[1].encodedTitle).toBe('title-2')
    })

    test('setSearch commits SetArticles with encodedArticles', async () => {
        expect.assertions(2)
        const search = {
            searchTerms: 'test AND test'
        }
        await store.dispatch('setSearch', search)
        expect(store.getters.loadedArticles[0].encodedTitle).toBe('title-1')
        expect(store.getters.loadedArticles[1].encodedTitle).toBe('title-2')
    })
})
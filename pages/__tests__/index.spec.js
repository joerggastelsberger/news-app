import { shallowMount, createLocalVue } from '@vue/test-utils'
import index from '../index.vue'
import ArticleList from "@/components/Articles/ArticleList.vue";
import Vuex from 'vuex'
import merge from 'lodash.merge'

const localVue = createLocalVue()
localVue.use(Vuex)

let loadedArticles

function createStore(overrides) {
    const defaultStoreConfig = {
        getters: {
            loadedArticles: () => loadedArticles
        },
        actions: {
            setCountry: () => {}
        }
    }
    return new Vuex.Store(
        merge(defaultStoreConfig, overrides)
    )
}

function createWrapper(overrides) {
    const defaultMountingOptions = {
        localVue,
        store: createStore(),
        components: { ArticleList }
    }
    return shallowMount(index, merge(defaultMountingOptions, overrides))
}

describe('index.vue', () => {
    test('renders articles when articles avaliable', () => {
        loadedArticles = [{}, {}, {}]
        const wrapper = createWrapper()
        expect(wrapper.find('.article-list').exists()).toBe(true)
    })

    test('renders user feedback when no articles avaliable', () => {
        loadedArticles = []
        const wrapper = createWrapper()
        expect(wrapper.find('.article-list-empty').exists()).toBe(true)
    })

    test('dispatches setCountry with "us" after two seconds when no articles avaliable', () => {
        loadedArticles = []
        const store = createStore()
        jest.spyOn(store, 'dispatch')
        jest.useFakeTimers()
        createWrapper({ store })
        jest.advanceTimersByTime(2000)
        expect(store.dispatch).toHaveBeenCalledWith('setCountry', 'us')
    })
})
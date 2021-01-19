import { shallowMount, createLocalVue } from '@vue/test-utils'
import _title from '../index.vue'
import dateFilter from '@/plugins/date-filter'
import merge from 'lodash.merge'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('@/assets/images/background-main.jpg', () => {
    return '@/assets/images/background-main.jpg'
})

let loadedArticle = {
    title: 'test-title',
    content: 'test-content',
    image: 'test-url',
    publishedAt: new Date(2020, 11, 12),
    author: 'test-author',
    source: {
        name: 'test-source'
    }
}

function createStore(overrides) {
    const defaultStoreConfig = {
        getters: {
            loadedArticle: () => loadedArticle
        }
    }
    return new Vuex.Store(
        merge(defaultStoreConfig, overrides)
    )
}

function createWrapper(overrides) {
    const defaultMountingOptions = {
        filter: [dateFilter],
        localVue,
        store: createStore()
    }
    return shallowMount(_title, merge(defaultMountingOptions, overrides))
}

describe('_title.vue', () => {
    test('renders article title', () => {
        const wrapper = createWrapper()
        expect(wrapper.text()).toContain('test-title')
    })

    test('renders article source', () => {
        const wrapper = createWrapper()
        expect(wrapper.text()).toContain('test-source')
    })

    test('renders article content', () => {
        const wrapper = createWrapper()
        expect(wrapper.text()).toContain('test-content')
    })

    test('renders article published at', () => {
        const wrapper = createWrapper()
        expect(wrapper.text()).toContain('12. December 2020')
    })

    test('renders an article image when avaliable in article', () => {
        const wrapper = createWrapper()
        const articleImage = wrapper.find('.article-image')
        expect(articleImage.element.style.backgroundImage).toBe(`url(test-url)`);
    })

    test('renders a default article image when no article image avaliable in article', () => {
        loadedArticle.image = ''
        const wrapper = createWrapper()
        const articleImage = wrapper.find('.article-image')
        expect(articleImage.element.style.backgroundImage).toBe(`url(@/assets/images/background-main.jpg)`);
    })
})
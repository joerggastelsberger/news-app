import { shallowMount, createLocalVue } from '@vue/test-utils'
import ArticlePreview from '../ArticlePreview.vue'
import merge from 'lodash.merge'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('@/assets/images/background-main.jpg', () => {
    return '@/assets/images/background-main.jpg'
})

function createStore(overrides) {
    const defaultStoreConfig = {
        actions: {
            setArticle: jest.fn(() => Promise.resolve())
        }
    }
    return new Vuex.Store(
        merge(defaultStoreConfig, overrides)
    )
}

function createWrapper(overrides) {
    const defaultMountingOptions = {
        propsData: {
            title: '',
            encodedTitle: '',
            description: '',
            url: '',
            urlToImage: ''
        },
        mocks: {
            $router: {
                push: () => {}
            }
        },
        localVue,
        store: createStore()
    }
    return shallowMount(ArticlePreview, merge(defaultMountingOptions, overrides))
}

describe('ArticlePreview.vue', () => {
    test('renders title', () => {
        const title = 'article title'
        const wrapper = createWrapper({
            propsData: {
                title
            },
            computed: {
                articleImage() {
                    return true
                }
            }
        })
        expect(wrapper.text()).toContain(title)
    })

    test('renders description', () => {
        const description = 'article description'
        const wrapper = createWrapper({
            propsData: {
                description
            },
            computed: {
                articleImage() {
                    return true
                }
            }
        })
        expect(wrapper.text()).toContain(description)
    })

    test('renders an article image when received as prop', () => {
        const urlToImage = 'someUrl'
        const wrapper = createWrapper({
            propsData: {
                urlToImage
            }
        })
        const articleImage = wrapper.find('.article-image')
        expect(articleImage.element.style.backgroundImage).toBe(`url(${urlToImage})`);
    })

    test('renders a default article image when no article image received as prop', () => {
        const wrapper = createWrapper()
        const articleImage = wrapper.find('.article-image')
        expect(articleImage.element.style.backgroundImage).toBe('url(@/assets/images/background-main.jpg)');
    })

    test('dispatches setArticle with this.encodedTitle when clicked', async () => {
        const encodedTitle = 'encoded-title'
        const store = createStore()
        jest.spyOn(store, 'dispatch')
        const wrapper = createWrapper({
            store,
            propsData: { encodedTitle }
        })
        await wrapper.trigger('click')
        expect(store.dispatch).toHaveBeenCalledWith(
            'setArticle',
            'encoded-title'
        )
    })

    test('pushes a route with this.encodedTitle when clicked', async () => {
        const encodedTitle = 'encoded-title'
        const mocks = {
            $router: {
                push: jest.fn()
            }
        }
        const wrapper = createWrapper({
            mocks,
            propsData: { encodedTitle }
        })
        await wrapper.trigger('click')
        expect(mocks.$router.push).toHaveBeenCalledWith('/encoded-title')
    })
})
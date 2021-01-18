import { shallowMount, createLocalVue } from '@vue/test-utils'
import TheSideNavModule from '../TheSideNavModule.vue'
import merge from 'lodash.merge'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

const items = [{ key: 'key1', name: 'name1' },
{ key: 'key2', name: 'name2' }]

function createStore(overrides) {
    const defaultStoreConfig = {
        getters: {
            category: () => {},
            country: () => {}
        },
        actions: {
            setCategory: jest.fn(() => Promise.resolve()),
            setCountry: jest.fn(() => Promise.resolve())
        }
    }
    return new Vuex.Store(
        merge(defaultStoreConfig, overrides)
    )
}

function createWrapper(overrides) {
    const defaultMountingOptions = {
        propsData: {
            items,
            isCategory: false
        },
        mocks: {
            $router: {
                push: () => { }
            }
        },
        localVue,
        store: createStore()
    }
    return shallowMount(TheSideNavModule, merge(defaultMountingOptions, overrides))
}

describe('TheSideNavModule.vue', () => {
    test('renders each item with name it receives', () => {
        const wrapper = createWrapper()
        const renderedItems = wrapper.findAll('.nav-item')
        expect(renderedItems).toHaveLength(items.length)
        renderedItems.wrappers.forEach((wrapper, i) => {
            expect(wrapper.text()).toContain(items[i].name)
        });
    })

    test('dispatches setCategory with item key when item is clicked and item is a category', async () => {
        const store = createStore()
        jest.spyOn(store, 'dispatch')
        const wrapper = createWrapper({
            store,
            propsData: { isCategory: true }
        })
        const item = wrapper.find('.nav-item')
        await item.trigger('click')
        expect(store.dispatch).toHaveBeenCalledWith('setCategory', 'key1')
    })

    test('dispatches setCountry with item key when item is clicked and item is a country', async () => {
        const store = createStore()
        jest.spyOn(store, 'dispatch')
        const wrapper = createWrapper({ store })
        const item = wrapper.find('.nav-item')
        await item.trigger('click')
        expect(store.dispatch).toHaveBeenCalledWith('setCountry', 'key1')
    })

    test('emits event close when item is clicked', async () => {
        const mocks = {
            $emit: jest.fn()
        }
        const wrapper = createWrapper({ mocks })
        const item = wrapper.find('.nav-item')
        await item.trigger('click')
        expect(mocks.$emit).toHaveBeenCalledWith('close')
    })

    test('pushes route to "/" when item is clicked', async () => {
        const mocks = {
            $router: {
                push: jest.fn()
            }
        }
        const wrapper = createWrapper({ mocks })
        const item = wrapper.find('.nav-item')
        await item.trigger('click')
        expect(mocks.$router.push).toHaveBeenCalledWith('/')
    })

    test('highlights a category when it is clicked', async () => {
        const store = createStore({ getters: { category: () => { return 'key1' } } })
        const wrapper = createWrapper({
            store,
            propsData: { isCategory: true }
        })
        const item = wrapper.find('.nav-item')
        await item.trigger('click')
        expect(item.classes()).toContain('highlight')
    })

    test('highlights a country when it is clicked', async () => {
        const store = createStore({ getters: { country: () => { return 'key1' } } })
        const wrapper = createWrapper({ store })
        const item = wrapper.find('.nav-item')
        await item.trigger('click')
        expect(item.classes()).toContain('highlight')
    })
})
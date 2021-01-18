import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import TheModal from '../TheModal.vue'
import AppButton from '@/components/UI/AppButton.vue'
import AppControlInput from '@/components/UI/AppControlInput.vue'
import AppDropDown from '@/components/UI/AppDropDown.vue'
import merge from 'lodash.merge'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuelidate)

function createStore(overrides) {
    const defaultStoreConfig = {
        actions: {
            setSearch: () => { },
            resetCriterias: () => { }
        }
    }
    return new Vuex.Store(
        merge(defaultStoreConfig, overrides)
    )
}

function createWrapper(shallowMounting, overrides) {
    const defaultMountingOptions = {
        propsData: {
            show: true
        },
        mocks: {
            $router: {
                push: () => { }
            }
        },
        stubs: {
            AppButton,
            AppControlInput,
            AppDropDown
        },
        store: createStore(),
        localVue
    }
    return shallowMounting ?
        shallowMount(TheModal, merge(defaultMountingOptions, overrides)) :
        mount(TheModal, merge(defaultMountingOptions, overrides))
}

describe('TheModal.vue', () => {
    test('displays no modal by default', () => {
        const propsData = {
            show: false
        }
        const wrapper = createWrapper(true, { propsData })
        expect(wrapper.find('.modal').exists()).toBe(false)
    })

    test('displays no backdrop by default', () => {
        const propsData = {
            show: false
        }
        const wrapper = createWrapper(true, { propsData })
        expect(wrapper.find('.modal-backdrop').exists()).toBe(false)
    })

    test('displays modal when it receives prop show with true', () => {
        const wrapper = createWrapper(true)
        expect(wrapper.find('.modal').exists()).toBe(true)
    })

    test('displays backdrop when it receives prop show with true', () => {
        const wrapper = createWrapper()
        expect(wrapper.find('.modal-backdrop').exists()).toBe(true)
    })

    test('emits event close when clicked on backdrop', async () => {
        const mocks = {
            $emit: jest.fn()
        }
        const wrapper = createWrapper(true, { mocks })
        await wrapper.find('.modal-backdrop').trigger('click')
        expect(mocks.$emit).toHaveBeenCalledWith('close')
    })

    test('emits event close when clicked on button cancel', async () => {
        const mocks = {
            $emit: jest.fn()
        }
        const wrapper = createWrapper(true, { mocks })
        await wrapper.findComponent(AppButton).trigger('click')
        expect(mocks.$emit).toHaveBeenCalledWith('close')
    })

    test('dispatches setSearch on form submit', async () => {
        const searchTerms = 'test search terms'
        const selectedCriteria = 'testcriteria'
        const store = createStore()
        jest.spyOn(store, 'dispatch')
        const wrapper = createWrapper(false, { store })
        wrapper.setData({ searchTerms: searchTerms, selectedCriteria: selectedCriteria })
        await wrapper.find('form').trigger('submit.prevent')
        const resultPayload = { searchTerms: searchTerms, criteria: selectedCriteria }
        expect(store.dispatch).toHaveBeenCalledWith('setSearch', resultPayload)
    })

    test('dispatches resetCriterias on form submit', async () => {
        const store = createStore()
        jest.spyOn(store, 'dispatch')
        const wrapper = createWrapper(false, { store })
        wrapper.setData({ searchTerms: 'test search terms' })
        await wrapper.find('form').trigger('submit.prevent')
        expect(store.dispatch).toHaveBeenCalledWith('resetCriterias')
    })

    test('emits event close on form submit', async () => {
        const mocks = {
            $emit: jest.fn()
        }
        const wrapper = createWrapper(false, { mocks })
        wrapper.setData({ searchTerms: 'test search terms' })
        await wrapper.find('form').trigger('submit.prevent')
        expect(mocks.$emit).toHaveBeenCalledWith('close')
    })

    test('pushes route to "/" on form submit', async () => {
        const mocks = {
            $router: {
                push: jest.fn()
            }
        }
        const wrapper = createWrapper(false, { mocks })
        wrapper.setData({ searchTerms: 'test search terms' })
        await wrapper.find('form').trigger('submit.prevent')
        expect(mocks.$router.push).toHaveBeenCalledWith('/')
    })
})
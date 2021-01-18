import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import DefaultLayout from '../default.vue'
import TheHeader from '@/components/Navigation/TheHeader.vue'
import TheSideNav from '@/components/Navigation/TheSideNav.vue'
import TheModal from '@/components/Navigation/TheModal.vue'
import AppButton from '@/components/UI/AppButton.vue'
import AppControlInput from '@/components/UI/AppControlInput.vue'
import AppDropDown from '@/components/UI/AppDropDown.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import merge from 'lodash.merge'
import Vuelidate from 'vuelidate'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(Vuelidate)

function createStore(overrides) {
    const defaultStoreConfig = {
        getters: {
            categories: () => {},
            countries: ()  => {}
        },
    }
    return new Vuex.Store(
        merge(defaultStoreConfig, overrides)
    )
}

function createWrapper(overrides) {
    const defaultMountingOptions = {
        stubs: {
            Nuxt: {
                template: '<div><slot /></div>'
            },
            NuxtLink: RouterLinkStub,
            AppButton,
            AppControlInput,
            AppDropDown
        },
        store: createStore(),
        localVue
    }
    return mount(DefaultLayout, merge(defaultMountingOptions, overrides))
}

describe('default.vue', () => {
    test('displays sidenav when it receives event side-nav-toggle and no sidenav is displayed', () => {
        expect.assertions(2)
        const wrapper = createWrapper()
        expect(wrapper.vm.displaySideNav).toBe(false)
        wrapper.findComponent(TheHeader).vm.$emit('side-nav-toggle')
        expect(wrapper.vm.displaySideNav).toBe(true)
    })

    test('displays modal when it receives event modal-open and no modal is displayed', () => {
        expect.assertions(2)
        const wrapper = createWrapper()
        expect(wrapper.vm.displayModal).toBe(false)
        wrapper.findComponent(TheHeader).vm.$emit('modal-open')
        expect(wrapper.vm.displayModal).toBe(true)
    })

    test('removes sidenav when it receives event side-nav-toggle and sidenav is displayed', () => {
        expect.assertions(2)
        const wrapper = createWrapper()
        wrapper.findComponent(TheHeader).vm.$emit('side-nav-toggle')
        expect(wrapper.vm.displaySideNav).toBe(true)
        wrapper.findComponent(TheHeader).vm.$emit('side-nav-toggle')
        expect(wrapper.vm.displaySideNav).toBe(false)
    })

    test('removes modal when it receives event modal-open and modal is displayed', () => {
        expect.assertions(2)
        const wrapper = createWrapper()
        wrapper.findComponent(TheHeader).vm.$emit('modal-open')
        expect(wrapper.vm.displayModal).toBe(true)
        wrapper.findComponent(TheHeader).vm.$emit('modal-open')
        expect(wrapper.vm.displayModal).toBe(false)
    })

    test('removes sidnav when it receives event close', () => {
        const wrapper = createWrapper()
        wrapper.findComponent(TheSideNav).vm.$emit('close')
        expect(wrapper.vm.displaySideNav).toBe(false)
    })

    test('removes sidnav when it receives event close', () => {
        const wrapper = createWrapper()
        wrapper.findComponent(TheModal).vm.$emit('close')
        expect(wrapper.vm.displayModal).toBe(false)
    })
})